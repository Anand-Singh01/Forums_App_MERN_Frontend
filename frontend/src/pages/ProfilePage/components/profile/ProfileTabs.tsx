// ProfileTabs.tsx
import { Tab, Tabs } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GridOnIcon from "@mui/icons-material/GridOn";

interface ProfileTabsProps {
  value: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const a11yProps = (index: number) => ({
  id: `profile-tab-${index}`,
  'aria-controls': `profile-tabpanel-${index}`,
});

export const ProfileTabs = ({ value, onTabChange }: ProfileTabsProps) => {
  return (
    <Tabs 
      value={value} 
      onChange={onTabChange} 
      variant="fullWidth"
      className="border-t border-b border-gray-200"
    >
      <Tab 
        icon={<GridOnIcon />} 
        iconPosition="start" 
        label="POSTS" 
        {...a11yProps(0)} 
      />
      <Tab 
        icon={<BookmarkBorderIcon />} 
        iconPosition="start" 
        label="SAVED" 
        {...a11yProps(1)} 
      />
      <Tab 
        icon={<FavoriteBorderIcon />} 
        iconPosition="start" 
        label="LIKED" 
        {...a11yProps(2)} 
      />
    </Tabs>
  );
};