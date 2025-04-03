// ProfilePage.tsx
import { useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { useGetUserProfile } from "../../api/profileApi";
import Layout from "../../shared/layout/Layout";
import LoaderSpinner from "../../shared/components/LoaderSpinner";
import { ProfileHeader } from "./components/profile/ProfileHeader";
import { ProfileTabs } from "./components/profile/ProfileTabs";
import { ProfilePosts } from "./components/profile/ProfilePosts";
import { ProfileSaved } from "./components/profile/ProfileSaved";
import { ProfileLiked } from "./components/profile/ProfileLiked";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
    >
      {value === index && <div className="py-4">{children}</div>}
    </div>
  );
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const userId = useAppSelector(state => state.userInfoSlice.userInfo.userId);
  const { data: profileResponse, isLoading } = useGetUserProfile(userId);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (isLoading) return <LoaderSpinner />;
  if (!profileResponse?.data) return <div>User not found</div>;

  const { data: profile } = profileResponse;

  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="max-w-4xl mx-auto p-4">
        <ProfileHeader profile={profile} />
        <ProfileTabs value={activeTab} onTabChange={handleTabChange} />
        
        <TabPanel value={activeTab} index={0}>
          <ProfilePosts posts={profile.posts || []} />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <ProfileSaved />
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          <ProfileLiked />
        </TabPanel>
      </div>
    </Layout>
  );
};

export default ProfilePage;