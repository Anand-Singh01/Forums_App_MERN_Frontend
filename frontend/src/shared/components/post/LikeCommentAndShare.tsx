import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useState } from "react";
import { likePostApi, unlikePostApi } from "../../../api/likePostApi";
import { toast } from "react-toastify";

interface LikeCommentAndShareProps {
  totalLikes: number;
  totalComments: number;
  isLiked: boolean;
  postId: string;
}
const LikeCommentAndShare = ({
  totalComments,
  isLiked,
  postId,
  totalLikes,
}: LikeCommentAndShareProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(totalLikes);
  const [isLoading, setIsLoading] = useState(false);


  const handleLikeToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (liked) {
        setLikesCount(likesCount - 1);
        setLiked(false);
        await unlikePostApi(postId); 
      } else {
        setLikesCount(likesCount + 1);
        setLiked(true);
        await likePostApi(postId); 
      }
    } catch (error) {
      toast.error("Failed to update like status");
      setLikesCount(likesCount);
      setLiked(!liked);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <section className="flex md:gap-5 justify-end">
        <p className="lightText">{totalComments} Comments</p>
        <p className="lightText">{likesCount} Likes</p>
      </section>

      <section className="flex md:gap-5 justify-between border-y-[1px] py-2 md:px-5">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer" onClick={handleLikeToggle}>
            {liked ? (
              <FavoriteIcon sx={{ fontSize: "1.2rem", color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ fontSize: "1.2rem" }} />
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <ChatBubbleOutlineOutlinedIcon
              sx={{ color: "#6a7282", fontSize: "1.2rem" }}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <ShareOutlinedIcon sx={{ color: "#6a7282", fontSize: "1.2rem" }} />
          </div>
        </div>
      </section>

    </div>
  );
};

export default LikeCommentAndShare;