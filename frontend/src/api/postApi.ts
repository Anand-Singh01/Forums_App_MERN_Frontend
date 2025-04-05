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

export const addPostApi = async (
  file: File,
  caption: string,
  location: string | null
): Promise<IPostInfo> => {
  const formData = new FormData();
  formData.append("postImage", file);
  formData.append("caption", caption);
  if (location) {
    formData.append("location", location);
  }
  const response = await axios.post("/post/add-post", formData, {
    withCredentials: true,
  });
  return response.data.data;
};
