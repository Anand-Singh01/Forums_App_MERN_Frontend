import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UserProfile {
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
  }>;
}

export const useGetUserProfile = (userId: string) => {
    return useQuery<UserProfile>({
      queryKey: ["userProfile", userId],
      queryFn: async () => {
        const response = await axios.get(`/get-profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        return response.data;
      },
    });
  };