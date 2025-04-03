import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProfileResponse } from "../shared/interfaces";


export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  posts: Array<{
    id: string;
    imageUrl: string;
    caption: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
  }>;
}

export const useGetUserProfile = (userId: string) => {
  return useQuery<IProfileResponse>({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const response = await axios.get<IProfileResponse>(`/profile/get-profile`, {
        params: { userId }
      });
      return response.data;
    }
  });
};