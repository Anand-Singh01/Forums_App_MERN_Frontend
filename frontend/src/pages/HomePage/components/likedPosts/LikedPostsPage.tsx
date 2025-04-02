import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLikedPostsApi } from "../../../../api/likePostApi";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import { IPostInfo } from "../../../../shared/interfaces";

const LikedPostsPage = () => {
  const { data: likedPosts, isLoading, isError, error } = useQuery<IPostInfo[]>({
    queryKey: ["likedPosts"],
    queryFn: getLikedPostsApi,
    retry: false,
  });

  if (isLoading) return <LoaderSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liked Posts</h2>

      {likedPosts?.length === 0 ? (
        <p>No liked posts yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 auto-rows-[600px]">
          {likedPosts?.map((post) => (
            <div key={post.postId} className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <img src={post.postImage} alt="Post" className="w-full h-full object-cover rounded-sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedPostsPage;
