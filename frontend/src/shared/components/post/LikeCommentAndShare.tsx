import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useState } from "react";
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
  return (
    <div>
      <section className="flex md:gap-5 justify-end">
        <p className="lightText">{totalComments} Comments</p>
        <p className="lightText">{totalLikes} Likes</p>
      </section>

      <section className="flex md:gap-5 justify-between border-y-[1px] py-2 md:px-5">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer" onClick={() => setLiked(!liked)}>
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