import axios from "axios";
import { IExtendedResponse, IPostInfo } from "../shared/interfaces";

export const getAllPostsApi = async (): Promise<IPostInfo[]> => {
  const response = await axios.get("/post/get-trending-post", {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Failed to authenticate user");
  }
  const { data } = response.data as IExtendedResponse<IPostInfo[]>;
  return data;
};