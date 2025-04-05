import axios from "axios";
import { IExtendedResponse, IUserInfo, IUserLogin } from "../shared/interfaces";

export const checkAuthApi = async (): Promise<IUserInfo> => {
  const response = await axios.get("/auth/check-auth", {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Failed to authenticate user");
  }
  const { data } = response.data as IExtendedResponse<IUserInfo>;
  return data;
};

export const loginApi = async (payload: IUserLogin): Promise<IUserInfo> => {
  const response = await axios.post("/auth/login", payload, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Failed to authenticate user");
  }
  const { data } = response.data as IExtendedResponse<IUserInfo>;
  return data;
};