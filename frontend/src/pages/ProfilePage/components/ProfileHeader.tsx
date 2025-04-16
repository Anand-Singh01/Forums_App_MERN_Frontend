import { useState } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { IProfile } from "../../../shared/interfaces";
import { useAppSelector } from "../../../state/hooks";
import { EditProfilePage } from "./EditProfilePage";

interface ProfileHeaderProps {
  profile: IProfile;
  isCurrentUser: boolean;
  refetchProfile: () => void;
}

export const ProfileHeader = ({ profile, isCurrentUser, refetchProfile }: ProfileHeaderProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

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
              <Typography className="font-bold">{profile.postsCount || 0}</Typography>
              <Typography>Posts</Typography>
            </div>
            <div className="text-center">
              <Typography className="font-bold">{profile.followersCount || 0}</Typography>
              <Typography>Followers</Typography>
            </div>
            <div className="text-center">
              <Typography className="font-bold">{profile.followingCount || 0}</Typography>
              <Typography>Following</Typography>
            </div>
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