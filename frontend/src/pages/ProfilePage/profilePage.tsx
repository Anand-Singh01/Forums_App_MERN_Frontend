import { useState } from "react";
import { useGetUserProfile } from "../../api/ProfileApi";
import LoaderSpinner from "../../shared/components/LoaderSpinner";
import Layout from "../../shared/layout/Layout";
import { useAppSelector } from "../../state/hooks";
import LikedPostsPage from "../HomePage/components/likedPosts/LikedPostsPage";
import SavedPostsPage from "../HomePage/components/savedPosts/SavedPostsPage";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfilePosts } from "./components/ProfilePosts";
import { ProfileTabs } from "./components/ProfileTabs";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const userId = useAppSelector(state => state.postSlice.selectedUserProfileId);
  const currentUserId = useAppSelector(state => state.userInfoSlice.userInfo.userId);
  const { data: profileResponse, isLoading, error } = useGetUserProfile(userId || "");
  const isCurrentUser = userId === currentUserId;

  if (isLoading) return <LoaderSpinner />;
  if (error) return <div>Error loading profile</div>;
  if (!profileResponse?.data) return <div>Profile not found</div>;

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
        {activeTab === 1 && <SavedPostsPage />}
        {activeTab === 2 && <LikedPostsPage />}
      </div>
    </Layout>
  );
};

export default ProfilePage;