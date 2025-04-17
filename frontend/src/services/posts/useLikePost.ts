import { useState } from "react";
import { likePostApi, unlikePostApi } from "../../api/likePostApi";
import { qcUpdateLikeStatus } from "../../state/tanstack/queryClient";

export const useLikePost = (postId: string, initialLiked: boolean, initialLikesCount: number) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handleLikeClick = async () => {
    const newLike = !liked;
    setLiked(newLike);
    setLikesCount((oldLike) => (newLike ? oldLike + 1 : oldLike - 1));

    try {
      if (newLike) {
        await likePostApi(postId);
        qcUpdateLikeStatus(postId);

      } else {
        await unlikePostApi(postId);
        qcUpdateLikeStatus(postId);

      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      setLiked(!newLike); 
      setLikesCount((prevCount) => (newLike ? prevCount - 1 : prevCount + 1));
    }
  };

  return { liked, likesCount, handleLikeClick };
};
