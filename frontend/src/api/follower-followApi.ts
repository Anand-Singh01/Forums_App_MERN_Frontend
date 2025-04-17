import axios from "axios";

export interface IFollowerDto {
  userId: string;
  profilePicture: string;
  userName: string;
  isFollowing:boolean
}

export const getAllFollowers = async (): Promise<IFollowerDto[]> => {
  const response = await axios.get("/follow/get-followers-list", {
    withCredentials: true,
  });
  return response.data.data;
};

export const updateFollow = async(friendId:string): Promise<IFollowerDto>=>{
  const response = await axios.get(`/follow/update-follow/${friendId}`, {
    withCredentials: true,
  });
  return response.data.data;
}