import axios from "axios";

export interface ICommentDto {
  commentId: string;
  comment: string;
  isEdited: boolean;
  postId: string;
  commentedBy: {
    userId: string;
    userName: string;
    profilePicture: string;
  };
  replyCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const addCommentApi = async (
  postId: string,
  comment: string
): Promise<ICommentDto> => {
  const response = await axios.post(
    "/comment/add-comment",
    { postId, comment },
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export const getAllCommentsApi = async (
  postId: string
): Promise<ICommentDto[]> => {
  const response = await axios.get(`/comment/get-all-comments/${postId}`, {
    withCredentials: true,
  });
  return response.data.data;
};
