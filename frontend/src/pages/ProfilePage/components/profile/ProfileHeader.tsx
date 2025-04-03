import { Avatar, Button, Grid, Typography } from "@mui/material";
import { IProfile } from "../../../../shared/interfaces";

interface ProfileHeaderProps {
  profile: IProfile;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => (
  <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
    <Avatar
      src={profile.profilePicture}
      sx={{ width: 200, height: 200 }}
      className="border-2 border-gray-300"
    />
    
    <div className="flex-1">
      <div className="flex items-center gap-4 mb-4">
        <Typography variant="h5" className="font-semibold">
          {profile.profileName || profile.userName}
        </Typography>
        <Button variant="outlined" size="small">
          Edit Profile
        </Button>
      </div>
      
      <div className="flex gap-8 mb-4">
        <div className="text-center">
          <Typography variant="subtitle1" className="font-bold">
            {profile.postsCount}
          </Typography>
          <Typography variant="body2">Posts</Typography>
        </div>
        <div className="text-center">
          <Typography variant="subtitle1" className="font-bold">
            {profile.followersCount}
          </Typography>
          <Typography variant="body2">Followers</Typography>
        </div>
        <div className="text-center">
          <Typography variant="subtitle1" className="font-bold">
            {profile.followingCount}
          </Typography>
          <Typography variant="body2">Following</Typography>
        </div>
      </div>
      
      <Typography variant="body1">
        {profile.bio || "No bio yet."}
      </Typography>
    </div>
  </div>
);