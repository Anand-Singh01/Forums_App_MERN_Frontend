import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
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
    Icon: MapsUgcOutlinedIcon,
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