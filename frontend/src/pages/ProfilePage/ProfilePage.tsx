import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserProfile } from "../../api/profileApi";
import Layout from "../../shared/layout/Layout";
import LoaderSpinner from "../../shared/components/LoaderSpinner";
import { ProfileHeader } from "./components/profile/ProfileHeader";
import { ProfileTabs } from "./components/profile/ProfileTabs";
import { ProfilePosts } from "./components/profile/ProfilePosts";
import { ProfileSaved } from "./components/profile/ProfileSaved";
import { ProfileLiked } from "./components/profile/ProfileLiked";
import { useAppSelector } from "../../state/hooks";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { userId } = useParams();
  const currentUserId = useAppSelector(state => state.userInfoSlice.userInfo.userId);
  const { data: profileResponse, isLoading, error } = useGetUserProfile(userId || "");

  if (isLoading) return <LoaderSpinner />;
  if (error) return <div>Error loading profile</div>;
  if (!profileResponse?.data) return <div>Profile not found</div>;

  const isCurrentUser = userId === currentUserId;

  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="max-w-4xl mx-auto p-4">
        <ProfileHeader 
          profile={profileResponse.data} 
          isCurrentUser={isCurrentUser} 
        />
        <ProfileTabs 
          value={activeTab} 
          onTabChange={(_, newValue) => setActiveTab(newValue)} 
        />
        
        {activeTab === 0 && <ProfilePosts posts={[]} />}
        {activeTab === 1 && <ProfileSaved />}
        {activeTab === 2 && <ProfileLiked />}
      </div>
    </Layout>
  );
};

export default ProfilePage;