import { Avatar, Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateFollowApi } from "../../../api/userApi";
import { IProfile } from "../../../shared/interfaces";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { updateActiveParticipant } from "../../../state/slices/chatSlice";
import { EditProfilePage } from "./EditProfilePage";

interface ProfileHeaderProps {
  profile: IProfile;
  isCurrentUser: boolean;
  refetchProfile: () => void;
}

export const ProfileHeader = ({
  profile,
  isCurrentUser,
  refetchProfile,
}: ProfileHeaderProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);
  const [followerCount, setFollowerCount] = useState(profile.followersCount || 0);

  const currentUserId = useAppSelector(
    (state) => state.userInfoSlice.userInfo.userId
  );
  const activeUserId = useAppSelector(
    (state) => state.postSlice.selectedUserProfileId
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!activeUserId) throw new Error("No user selected");
      return updateFollowApi(activeUserId);
    },
    onSuccess: () => {
      setIsFollowing(prev => !prev);
      setFollowerCount(prev => isFollowing ? Math.max(prev - 1, 0) : prev + 1);
    },
    onError: (error) => {
      console.error("Follow operation failed:", error);
      // Optionally show error to user
    }
  });

  const showFollowButton = useMemo(() => {
    return currentUserId !== activeUserId && activeUserId;
  }, [currentUserId, activeUserId]);

  const handleMessageClick = () => {
    if (!activeUserId) return;
    
    dispatch(
      updateActiveParticipant({
        profilePicture: profile.profilePicture,
        userId: activeUserId,
        userName: profile.profileName,
        isFollowing: isFollowing,
      })
    );
    navigate("/messages");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <Avatar
          src={profile.profilePicture}
          sx={{ width: 150, height: 150 }}
          className="border-2 border-gray-300"
        />

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <Typography variant="h5" className="font-semibold">
              {profile.profileName}
            </Typography>
            {isCurrentUser && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setEditModalOpen(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <div className="flex gap-8 mb-4">
            <div className="text-center">
              <Typography className="font-bold">
                {profile.postsCount || 0}
              </Typography>
              <Typography>Posts</Typography>
            </div>
            <div className="text-center">
              <Typography className="font-bold">
                {followerCount}
              </Typography>
              <Typography>Followers</Typography>
            </div>
            <div className="text-center">
              <Typography className="font-bold">
                {profile.followingCount || 0}
              </Typography>
              <Typography>Following</Typography>
            </div>
          </div>

          <div className="my-2 flex items-center gap-3">
            {showFollowButton && (
              <Button 
                onClick={() => mutate()} 
                variant="outlined" 
                disabled={isPending}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
            <Button
              onClick={handleMessageClick}
              variant="outlined"
            >
              Message
            </Button>
          </div>

          <Typography>
            {profile.profileDescription || "No bio yet."}
          </Typography>
        </div>
      </div>

      {isCurrentUser && (
        <EditProfilePage
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          profile={{
            profileName: profile.profileName,
            profilePicture: profile.profilePicture,
            profileDescription: profile.profileDescription || "",
          }}
          onProfileUpdated={refetchProfile}
        />
      )}
    </>
  );
};