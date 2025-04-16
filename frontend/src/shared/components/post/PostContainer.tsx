import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../state/hooks";
import { updateselectedUserProfileIdId } from "../../../state/slices/postSlice";
import { IPostInfo } from "../../interfaces";
import UserGeneralInfo from "../UserGeneralInfo";
import AddComment from "./AddComment";
import DropdownPostMenu from "./DropdownPostMenu";
import LikeCommentAndShare from "./LikeCommentAndShare";
import PostImage from "./PostImage";
interface IPostContainerProps {
  post: IPostInfo;
}
const PostContainer: React.FC<IPostContainerProps> = ({ post }) => {
  const { profileImage, userName } = post.postedBy;
  const navigate = useNavigate();
  const currentUserId = useAppSelector(
    (state) => state.userInfoSlice.userInfo.userId
  );
  const {
    region,
    postImage,
    totalLikes,
    isLiked,
    totalComments,
    caption,
    postId,
  } = post;

  const dispatch = useDispatch();
  return (
    <div className="p-3 h-fit bg-white relative shadow-sm space-y-3 rounded-md">
      {currentUserId === post.postedBy.userId && 
      <DropdownPostMenu postId={post.postId} postedById={post.postedBy.userId} isSaved={post.isSaved}/>}
      <section onClick={() => {
        dispatch(updateselectedUserProfileIdId(post.postedBy.userId))
        navigate("/profile");
      }} className="space-y-2 cursor-pointer">
        <UserGeneralInfo
          region={region}
          profileImage={profileImage}
          userName={userName}
        />
        <div
          className="no-scrollbar pl-5 max-h-[5rem] 
        overflow-y-scroll text-wrap"
        >
          <p> {caption}</p>
        </div>
      </section>

      <section className="flex justify-center">
        <PostImage postImage={postImage} />
      </section>
      <p className="flex justify-end text-[12px] text-gray-500">
        {formatDistanceToNow(new Date(post.updatedAt), {
          addSuffix: true,
        })}
      </p>
      <LikeCommentAndShare
        isLiked={isLiked}
        postId={postId}
        totalLikes={totalLikes}
        totalComments={totalComments}
      />
      <section>
        <AddComment postId={postId} profileImage={profileImage} />
      </section>
    </div>
  );
};

export default PostContainer;