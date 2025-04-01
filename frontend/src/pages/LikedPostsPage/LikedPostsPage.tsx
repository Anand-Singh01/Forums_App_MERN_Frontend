import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLikedPostsApi } from "../../api/likePostApi";
import LoaderSpinner from "../../shared/components/LoaderSpinner";
import { IPostInfo } from "../../shared/interfaces";
import {toast} from "react-toastify";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likedPosts?.map((post) => (
            <div key={post.postId} className="border p-4 rounded-lg shadow-md">
              <img src={post.postImage} alt="Post" className="w-full h-48 object-cover rounded" />
              <h3 className="font-semibold mt-2">{post.caption}</h3>
              <p className="text-gray-500 text-sm">{post.totalLikes} Likes</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedPostsPage;
