// components/profile/ProfileLiked.tsx
import { useQuery } from "@tanstack/react-query";
import { getLikedPostsApi, ILikedPostDto } from "../../../../api/likePostApi";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import { useAppDispatch } from "../../../../state/hooks";
import { updateSelectedPostIdOnFeed } from "../../../../state/slices/postSlice";

export const ProfileLiked = () => {
  const { data: likedPosts, isLoading, isError, error } = useQuery<ILikedPostDto[]>({
    queryKey: ["likedPosts"],
    queryFn: getLikedPostsApi,
  });

  const dispatch = useAppDispatch();

  if (isLoading) return <LoaderSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      {likedPosts?.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No liked posts yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 auto-rows-[200px]">
          {likedPosts?.map((post) => (
            <div 
              onClick={() => dispatch(updateSelectedPostIdOnFeed(post.postId))} 
              key={post.postId} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-7 border-black rounded-2xl overflow-hidden"
            >
              <img 
                src={post.postImage} 
                alt="Post" 
                className="w-full h-full object-cover rounded-sm" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};