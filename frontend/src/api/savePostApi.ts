import axios from "axios";
import { IExtendedResponse, IPostInfo } from "../shared/interfaces";

export const getSavedPostsApi = async (): Promise<IPostInfo[]> => {
  const response = await axios.get("/save/getAllSaved", { withCredentials: true });

  if (response.status !== 200) {
    throw new Error("Failed to fetch saved posts");
  }

  const { data } = response.data as IExtendedResponse<IPostInfo[]>;
  return data;
};

export const savePostApi = async (postId: string): Promise<void> => {
  const response = await axios.post(
    "/save/save-Post",
    { postId },
    { withCredentials: true }
  );

  if (response.status !== 200) {
    throw new Error("Failed to save post");
  }
};

export const unsavePostApi = async (postId: string): Promise<void> => {
  const response = await axios.post(
    "/save/unsave-Post",
    { postId },
    { withCredentials: true }
  );

  if (response.status !== 200) {
    throw new Error("Failed to unsave post");
  }
};