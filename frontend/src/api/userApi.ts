import axios from "axios";
import { IExtendedResponse } from "../shared/interfaces";

export interface IRandomUserInfoDto {
  userId: string;
  userName: string;
  profilePicture: string;
  isFollowing: boolean;
}

export interface IUserGeneralInfo {
  userName: string;
  profilePicture: string;
  joinedOn: Date;
  email: string;
}

export const getAllUserSuggestions = async (): Promise<
  IRandomUserInfoDto[]
> => {
  const response = await axios.get("/user/random-account", {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch suggestions");
  }
  const { data } = response.data as IExtendedResponse<IRandomUserInfoDto[]>;
  return data;
};

export const getGeneralUserInfo = async (
  userId: string
): Promise<IUserGeneralInfo> => {
  const response = await axios.get(`/user/general-user-info/${userId}`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch suggestions");
  }
  const { data } = response.data as IExtendedResponse<IUserGeneralInfo>;
  return data;
};