import React from "react";

interface IPostImageProps {
  postImage: string;
}

const PostImage: React.FC<IPostImageProps> = ({ postImage }) => {
  return (
    <div className="w-full max-w-[30rem] aspect-square overflow-hidden rounded-lg">
      <img className="w-full h-full object-cover" src={postImage} alt="Post" />
    </div>
  );
};

export default PostImage;
