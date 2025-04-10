import { QueryClient } from "@tanstack/react-query";
import { IConversationDto } from "../../api/chatApi";
import { ICommentDto, IReplyDto } from "../../api/commentApi";
import { IRandomUserInfoDto } from "../../api/userApi";
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
//["conversation", receiverId]
export const qcAddMessageToConversation = (key:string[], message:string, senderId:string) => {
  queryClient.setQueryData(
    key,
    (prevData: IConversationDto | undefined) => {
      if (!prevData) {
        return prevData;
      }
      const newMessage = {
        content: message,
        createdAt: new Date(),
        isEdited: false,
        messageId: `temp-${Date.now()}`,
        senderId: senderId,
      };

      return {
        ...prevData,
        messages: [...prevData.messages, newMessage],
      };
    }
  );
};

export const qcChangeFollowStateInSuggestions = (friendId:string) => {
  queryClient.setQueryData(
    ["suggestions"],
    (prevData: IRandomUserInfoDto[] | undefined) => {
      if (!prevData) {
        return;
      }
      const index = prevData.findIndex(p => p.userId === friendId);
      if(index == -1){
        return;
      }
      prevData[index].isFollowing = !prevData[index].isFollowing;
      return [...prevData]
    }
  );
};


export const qcUpdateLikeStatus = (postId: string) => {
  queryClient.setQueryData(["posts"], (prevData: IPostInfo[] | undefined) => {
    if (!prevData) {
      return [];
    }

    const newData = [...prevData];
    const index = newData.findIndex((p) => p.postId === postId);
    if (index === -1) {
      return newData;
    }

    const targetPost = newData[index];
    const isLiked = !targetPost.isLiked;
    const totalLikes = isLiked
      ? targetPost.totalLikes + 1
      : targetPost.totalLikes - 1;

    newData[index] = {
      ...targetPost,
      isLiked,
      totalLikes,
    };

    return newData;
  });
};

export const qcUpdatePostInCache = (post: IPostInfo) => {
  const { postId } = post;

  // Update list
  queryClient.setQueryData<IPostInfo[]>(['posts'], (oldPosts = []) =>
    oldPosts.map(p => (p.postId === postId ? post : p))
  );
};

export const qcDeletePostInCache = (postId:string) => {
  // Update list
  queryClient.setQueryData<IPostInfo[]>(['posts'], (oldPosts = []) =>
    oldPosts.filter(p => (p.postId !== postId ))
  );
};

export default queryClient;



