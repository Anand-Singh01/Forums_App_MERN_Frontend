import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import React from "react";
import { IPostInfo } from "../../interfaces";
import UserGeneralInfo from "../UserGeneralInfo";
import PostImage from "./PostImage";
interface IPostContainerProps {
  post: IPostInfo;
}
const PostContainer: React.FC<IPostContainerProps> = ({ post }) => {
  const { profileImage, userName } = post.postedBy;
  const { region, postImage, totalLikes, totalComments } = post;
  return (
    <div className="p-3 md:w-[550px] h-fit bg-white space-y-3 rounded-md">
      <section>
        <UserGeneralInfo
          region={region}
          profileImage={profileImage}
          userName={userName}
        />
      </section>

      <section className="flex justify-center">
        <PostImage postImage={postImage} />
      </section>

      <section className="flex md:gap-5 justify-end">
        <p className="lightText">{totalComments} Comments</p>
        <p className="lightText">{totalLikes} Likes</p>
      </section>

      <section className="flex md:gap-5 justify-between border-y-[1px] py-2">
        <div className="flex gap-2 items-center">
          <div>
            <FavoriteBorderOutlinedIcon
              sx={{ color: "#6a7282", fontSize: "1.2rem" }}
            />
          </div>

          <p className="lightText">Like</p>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <ChatBubbleOutlineOutlinedIcon
              sx={{ color: "#6a7282", fontSize: "1.2rem" }}
            />
          </div>
          <p className="lightText">Comments</p>
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <ShareOutlinedIcon sx={{ color: "#6a7282", fontSize: "1.2rem" }} />
          </div>
          <p className="lightText">Share</p>
        </div>
      </section>
    </div>
  );
};

export default PostContainer;
