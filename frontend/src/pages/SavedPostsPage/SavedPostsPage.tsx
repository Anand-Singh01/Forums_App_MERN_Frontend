import { useQuery } from "@tanstack/react-query";
import { getSavedPostsApi } from "../../api/savePostApi";
import LoaderSpinner from "../../shared/components/LoaderSpinner";
import { IPostInfo } from "../../shared/interfaces";

const SavedPostsPage = () => {
  const { data: savedPosts, isLoading, isError, error } = useQuery<IPostInfo[]>({
    queryKey: ["savedPosts"],
    queryFn: getSavedPostsApi,
    retry: false,
  });

  if (isLoading) return <LoaderSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;
console.log(savedPosts);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Saved Posts</h2>

      {savedPosts?.length === 0 ? (
        <p>No saved posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {savedPosts?.map((post) => (
            <div key={post.postId} className="border p-4 rounded-lg shadow-md">
              <img src={post.postImage} alt="Post" className="w-full h-48 object-cover rounded" />
              <h3 className="font-semibold mt-2">{post.caption}</h3>
              <p className="text-gray-500 text-sm">{post.totalSave} Saves</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPostsPage;
