import { QueryClient } from "@tanstack/react-query";
import { ICommentDto, IReplyDto } from "../../api/commentApi";
import { IPostInfo } from "../../shared/interfaces";

const queryClient = new QueryClient();

export const qcUpdateCommentCount = (postId: string) => {
  queryClient.setQueryData(["posts"], (prevData: IPostInfo[] | undefined) => {
    if (!prevData) {
      return [];
    }
    const newData = [...prevData];
    const index = newData.findIndex((p) => p.postId === postId);
    if (index === -1) {
      return [];
    }
    newData[index] = {
      ...newData[index],
      totalComments: newData[index].totalComments + 1,
    };
    return newData;
  });
};

export const qcUpdateReplyCount = (postId: string, commentId: string) => {
  queryClient.setQueryData(
    ["comments", postId],
    (prevData: ICommentDto[] | undefined) => {
      if (!prevData) {
        return [];
      }
      const newData = [...prevData];
      const index = newData.findIndex((p) => p.commentId === commentId);
      if (index === -1) {
        return [];
      }
      newData[index] = {
        ...newData[index],
        replyCount: newData[index].replyCount + 1,
      };
      return newData;
    }
  );
};

export const qcAddComment = (newComment: ICommentDto, postId: string) => {
  queryClient.setQueryData(
    ["comments", postId],
    (prevData: ICommentDto[] | undefined) => {
      if (!prevData) {
        return [newComment];
      }
      const newData = [newComment, ...prevData];
      return newData;
    }
  );
};

export const qcAddReply = (newReply: IReplyDto, commentId: string) => {
  queryClient.setQueryData(
    ["replies", commentId],
    (prevData: IReplyDto[] | undefined) => {
      if (!prevData) {
        return [newReply];
      }
      const newData = [newReply, ...prevData];
      return newData;
    }
  );
};
export default queryClient;
