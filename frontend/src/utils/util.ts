import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
export const leftSideBarLinks = [
  {
    Icon: HomeOutlinedIcon,
    path: "/",
    title: "Feed",
  },
  {
    Icon: AppsOutlinedIcon,
    path: "/explore",
    title: "Explore",
  },

  {
    Icon: BookmarksOutlinedIcon,
    path: "/saved",
    title: "Saved posts",
  },

  {
    Icon: FavoriteBorderOutlinedIcon,
    path: "/liked",
    title: "Liked Posts",
  },
];