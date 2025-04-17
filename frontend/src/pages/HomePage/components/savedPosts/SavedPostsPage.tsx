import { useQuery } from "@tanstack/react-query";
import { getSavedPostsApi, ISavedPostDto } from "../../../../api/savePostApi";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import { IPostInfo } from "../../../../shared/interfaces";
import { useAppDispatch } from "../../../../state/hooks";
import { updateSelectedPostIdOnFeed } from "../../../../state/slices/postSlice";

const SavedPostsPage = () => {
  const { data: savedPosts, isLoading, isError, error } = useQuery<ISavedPostDto[]>({
    queryKey: ["savedPosts"],
    queryFn: getSavedPostsApi,
  });

  const dispatch = useAppDispatch();
  if (isLoading) return <LoaderSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Saved Posts</h2>
      <div className="h-[calc(100vh-10rem)] no-scrollbar border overflow-y-auto">
      {savedPosts?.length === 0 ? (
        <p>No saved posts yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 auto-rows-[700px]">
          {savedPosts?.map((post) => (
              <div onClick={() => { dispatch(updateSelectedPostIdOnFeed(post.postId)); }} key={post.postId} className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-7 border-black rounded-2xl overflow-hidden">
                <img src={post.postImage} alt="Post" className="w-full h-full object-cover rounded-sm" />
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default SavedPostsPage;
