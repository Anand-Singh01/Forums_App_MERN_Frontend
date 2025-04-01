import ClearIcon from "@mui/icons-material/Clear";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { IPostInfo } from "../../../../../shared/interfaces";
import { useAppDispatch, useAppSelector } from "../../../../../state/hooks";
import { updateSelectedPostIdOnFeed } from "../../../../../state/slices/postSlice";
import queryClient from "../../../../../state/tanstack/queryClient";
import AddCommentInput from "./AddCommentInput";
import CommentSection from "./CommentSection";

const ViewPostContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const postId = useAppSelector(
    (state) => state.postSlice.selectedPostIdOnFeed
  );

  const post = postId
    ? queryClient
        .getQueryData<IPostInfo[]>(["posts"])
        ?.find((p) => p.postId === postId)
    : null;

  useEffect(() => {
    if (containerRef && containerRef.current && postId && post) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        }
      );
    }
  }, [post, postId]);

  if (!postId || !post) {
    toast.error("Post does not exist or could not be loaded.");
    dispatch(updateSelectedPostIdOnFeed(null));
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl h-[70vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => dispatch(updateSelectedPostIdOnFeed(null))}
          className="absolute top-2 right-2 cursor-pointer z-50 bg-white/80 rounded-full p-1 hover:bg-gray-200 transition-colors"
          aria-label="Close post view"
        >
          <ClearIcon sx={{ color: "black", fontSize: "1.5rem" }} />
        </button>

        {/* Main content */}
        <main className="flex flex-col md:flex-row w-full h-full">
          {/* Image section - now taller */}
          <section className="flex-1 bg-black flex items-center justify-center min-h-[50vh] md:min-h-full">
            <img
              className="w-full h-full object-contain max-h-[85vh]"
              src={post.postImage}
              alt={post.caption || "Post image"}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-post-image.png";
                (e.target as HTMLImageElement).alt =
                  "Failed to load post image";
              }}
            />
          </section>

          {/* Details section */}
          <section className="w-full md:w-96 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col overflow-y-auto">
            {/* User info and caption */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={post.postedBy.profileImage}
                  alt={`${post.postedBy.userName}'s profile`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default-profile.png";
                  }}
                />
                <div>
                  <p className="font-semibold text-sm">
                    {post.postedBy.userName}
                  </p>
                  <p className="text-sm mt-1">{post.caption}</p>
                </div>
              </div>
            </div>

            {/* Comments section */}
            <div className="flex-1 p-4 overflow-y-auto">
              <p className="font-semibold">Comments</p>
              <CommentSection postId={postId}/>
            </div>

            {/* Add comment section */}
            <AddCommentInput postId={postId}/>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ViewPostContainer;
