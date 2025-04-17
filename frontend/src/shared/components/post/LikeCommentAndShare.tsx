import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { useAppDispatch } from "../../../state/hooks";
import { updateSelectedPostIdOnFeed } from "../../../state/slices/postSlice";
import { useLikePost } from "../../../services/posts/useLikePost";
import { useSavePost } from "../../../services/posts/useSavePost";

interface LikeCommentAndShareProps {
  totalComments: number;
  isLiked: boolean;
  isSaved: boolean;
  postId: string;
  totalLikes: number;
}

const LikeCommentAndShare = ({
  totalComments,
  isLiked,
  isSaved,
  postId,
  totalLikes,
}: LikeCommentAndShareProps) => {
  const dispatch = useAppDispatch();
  const { liked, likesCount, handleLikeClick } = useLikePost(postId, isLiked, totalLikes);
  const { saved, handleSaveClick } = useSavePost(postId, isSaved);

  return (
    <div>
      <section className="flex md:gap-5 justify-between border-y-[1px] py-2 md:px-5">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer" onClick={handleLikeClick}>
            {liked ? (
              <FavoriteIcon sx={{ fontSize: "1.2rem", color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon sx={{ fontSize: "1.2rem" }} />
            )}
          </div>
          <p>{likesCount}</p>
        </div>

        <div
          onClick={() => dispatch(updateSelectedPostIdOnFeed(postId))}
          className="flex gap-2 items cursor-pointer"
        >
          <div>
            <ChatBubbleOutlineOutlinedIcon
              sx={{ color: "#6a7282", fontSize: "1.2rem" }}
            />
          </div>
          <p>{totalComments}</p>
        </div>

        <div className="flex gap-2 items-center">
          <div className="cursor-pointer" onClick={handleSaveClick}>
            {saved ? (
              <TurnedInIcon sx={{ fontSize: "1.2rem", color: "#f472b6" }} />
            ) : (
              <TurnedInIcon sx={{ fontSize: "1.2rem" }} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LikeCommentAndShare;
