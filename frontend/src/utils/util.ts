import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppSelector } from "../state/hooks";

export const leftSideBarLinks = () => {
  const currentUserId = useAppSelector(state => state.userInfoSlice.userInfo.userId);
  
  return [
    {
      Icon: AccountCircleIcon,
      path: `/profile/${currentUserId}`,
      title: "Profile",
    },
  
  {
    Icon: HomeOutlinedIcon,
    path: "/",
    title: "Feed",
  },
  {
    Icon: SearchOutlinedIcon,
    path: "/search",
    title: "Search",
  },
  {
    Icon: MapsUgcOutlinedIcon,
    path: "/messages",
    title: "Messages",
  },
  {
    Icon: BookmarksOutlinedIcon,
    path: "/saved",
    title: "My Saved",
  },

  {
    Icon: FavoriteBorderIcon,
    path: "/liked",
    title: "My Liked",
  },
  {
    Icon: SettingsOutlinedIcon,
    path: "/settings",
    title: "Settings",
  },
  
  
]};