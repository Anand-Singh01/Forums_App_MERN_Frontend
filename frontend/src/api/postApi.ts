import axios from "axios";
import { IExtendedResponse, IPostInfo } from "../shared/interfaces";

export interface IUpdatePostData {
  postId: string;
  caption: string;
  region: string | null;
  isImageUpdated: boolean;
}

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

export const getPostByIdApi = async (postId: string): Promise<IPostInfo> => {
  const response = await axios.get(`post/get-post/${postId}`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Failed to authenticate user");
  }
  const { data } = response.data as IExtendedResponse<IPostInfo>;
  return data;
};

export const updatePostApi = async (
  post: IUpdatePostData
): Promise<IPostInfo> => {
  const form = new FormData();
  const { caption, isImageUpdated, postId, region } = post;

  form.append("postId", postId);
  form.append("caption", caption);
  form.append("region", region || "");
  form.append("isImageUpdated", String(isImageUpdated));

  const response = await axios.put(`post/update-post`, form, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to update post");
  }

  const { data } = response.data as IExtendedResponse<IPostInfo>;
  return data;
};

export const deletePostApi = async (postId: string): Promise<void> => {
  const response = await axios.delete(`post/delete-post/${postId}`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to delete post");
  }
  return;
};
