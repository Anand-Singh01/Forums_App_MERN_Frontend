import React from "react";
import { IPostInfo } from "../../interfaces";
import UserGeneralInfo from "../UserGeneralInfo";
import AddComment from "./AddComment";
import LikeCommentAndShare from "./LikeCommentAndShare";
import PostImage from "./PostImage";
interface IPostContainerProps {
  post: IPostInfo;
}
const PostContainer: React.FC<IPostContainerProps> = ({ post }) => {
  const { profileImage, userName } = post.postedBy;
  const { region, postImage, totalLikes, isLiked, totalComments, caption, postId } = post;
  return (
    <div className="p-3 h-fit bg-white shadow-sm space-y-3 rounded-md">
      <section className="space-y-2">
        <UserGeneralInfo
          region={region}
          profileImage={profileImage}
          userName={userName}
        />
        <div className="no-scrollbar font-medium max-h-[5rem] overflow-y-scroll text-wrap">
          <p> {caption}</p>
        </div>
      </section>

      <section className="flex justify-center">
        <PostImage postImage={postImage} />
      </section>
      <LikeCommentAndShare isLiked={isLiked} postId={postId} totalLikes={totalLikes} totalComments={totalComments}/>
      <section>
        <AddComment profileImage={profileImage} />
      </section>
    </div>
  );
};

export default PostContainer;
