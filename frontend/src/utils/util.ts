import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const leftSideBarLinks = [

  {
    Icon: AccountCircleIcon,
    path: "/profile",
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
    Icon: TextsmsOutlinedIcon,
    path: "/messages",
    title: "Messages",
  },

  {
    Icon: BookmarksOutlinedIcon,
    path: "/saved",
    title: "My favorites",
  },

  {
    Icon: SettingsOutlinedIcon,
    path: "/settings",
    title: "Settings",
  },

];