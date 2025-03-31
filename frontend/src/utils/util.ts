import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
export const leftSideBarLinks = [
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