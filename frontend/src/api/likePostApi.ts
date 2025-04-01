import axios from "axios";
import { IExtendedResponse, IPostInfo } from "../shared/interfaces";

export const getLikedPostsApi = async (): Promise<IPostInfo[]> => {
  const response = await axios.get("/like/getAllLiked", { withCredentials: true });

  if (response.status !== 200) {
    throw new Error("Failed to fetch liked posts");
  }

  const { data } = response.data as IExtendedResponse<IPostInfo[]>;
  return data;
};

export const likePostApi = async (postId: string): Promise<void> => {
  const response = await axios.post(
    "/like/like-Post",
    { postId },
    { withCredentials: true }
  );

  if (response.status !== 200) {
    throw new Error("Failed to like post");
  }
};

export const unlikePostApi = async (postId: string): Promise<void> => {
  const response = await axios.post(
    "/like/unlike-Post",
    { postId },
    { withCredentials: true }
  );

  if (response.status !== 200) {
    throw new Error("Failed to unlike post");
  }
};



