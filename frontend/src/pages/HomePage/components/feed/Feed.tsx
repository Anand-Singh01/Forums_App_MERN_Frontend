import { useQuery } from "@tanstack/react-query";
import { getAllPostsApi } from "../../../../api/postApi";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import PostContainer from "../../../../shared/components/post/PostContainer";
import { IPostInfo } from "../../../../shared/interfaces";
import AddPost from "./components/AddPost";
import Notifications from "./components/Notifications";
import Suggestions from "./components/Suggestions";

const Feed = () => {
  const { data: posts = [], isPending } = useQuery<IPostInfo[]>({
    queryKey: ["posts"],
    queryFn: getAllPostsApi,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto h-[calc(100vh-100px)]">
      {/* Main Feed - Scrollable Area */}
      <main className="md:w-2/3 flex flex-col h-full overflow-hidden">
        {/* Fixed AddPost Section */}
        <div className="sticky top-0 z-10 py-4 px-4">
          <AddPost />
        </div>

        {/* Scrollable Posts Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2">
          {posts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No posts yet. Be the first to post!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostContainer key={post.postId} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Fixed Sidebar */}
      <aside className="hidden md:block md:w-1/3 h-full">
        <div className="sticky top-0 p-4 h-[calc(100vh-100px)] 
        space-y-3 overflow-y-auto">
          <Suggestions/>
          <Notifications/>
        </div>
      </aside>
    </div>
  );
};

export default Feed;