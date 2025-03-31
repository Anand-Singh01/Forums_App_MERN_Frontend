import axios from "axios";

export interface IFollowerDto {
  userId: string;
  profilePicture: string;
  userName: string;
}

export const getAllFollowers = async (): Promise<IFollowerDto[]> => {
  const response = await axios.get("/follow/get-followers-list", {
    withCredentials: true,
  });
  return response.data.data;
};