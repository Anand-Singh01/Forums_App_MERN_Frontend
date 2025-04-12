import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllFollowers } from "../../../api/follower-followApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import { leftSideBarLinks } from "../../../utils/util";
import SearchAccounts from "./feed/components/SearchAccounts";
import { updateselectedUserProfileIdId } from "../../../state/slices/postSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

interface Follower {
  profilePicture: string;
  userId: string;
  userName: string;
}
const LeftSideBar = () => {
  const {
    data: followers = [],
    isPending: isFetchingFollowers,
    isError,
  } = useQuery<Follower[]>({
    queryKey: ["followers"],
    queryFn: getAllFollowers,
    initialData: [],
    retry: 2,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector(state => state.userInfoSlice.userInfo.userId);
  let currentElement:
    | "Profile"
    | "Feed"
    | "Search"
    | "Messages"
    | "My Liked"
    | "My Saved"
    | "Settings" = "Feed";

  const location = useLocation();

  switch (location.pathname) {
    case "/":
      currentElement = "Feed";
      break;
      case "/search":
      currentElement = "Search";
      break;
    case "/liked":
      currentElement = "My Liked";
      break;
      case "/saved":
      currentElement = "My Saved";
      break;
      case "/profile":
      currentElement = "Profile";
      break;
      case "/settings":
      currentElement = "Settings";
      break;
    case "/messages":
      currentElement = "Messages";
      break;
    default:
      currentElement = "Feed";
      break;
  }

  return (
    <div className="w-[15rem] h-full flex flex-col bg-white pt-4 space-y-4 text-base sticky top-0">
      {/* Navigation Links */}
      <nav>
        {leftSideBarLinks.map(({ Icon, path, title }, index) =>
          path !== "/search" ? (
            <Link
              key={path || index}
              to={path}
              onClick={()=>{
                 dispatch(updateselectedUserProfileIdId(currentUserId))
                navigate("/profile");
              }}
              className="flex py-3 px-5 hover:bg-blue-50 gap-3 items-center transition-colors duration-200 rounded mx-2"
            >
              <Icon
                className={`text-[#6a7282] w-5 h-5 ${
                  currentElement === title ? "text-pink-600" : ""
                }`}
              />
              <span
                className={`${currentElement === title ? "text-pink-600" : ""}`}
              >
                {title}
              </span>
            </Link>
          ) : (
            <div className="">
              <Popover>
                <PopoverTrigger className="w-full">
                  <div
                    key={path || index}
                    className="flex py-3 px-5 hover:bg-blue-50 gap-3 items-center 
                  transition-colors duration-200 rounded mx-2"
                  >
                    <Icon
                      className={`text-[#6a7282] w-5 h-5 ${
                        currentElement === title ? "text-pink-600" : ""
                      }`}
                    />
                    <span
                      className={`${
                        currentElement === title ? "text-pink-600" : ""
                      }`}
                    >
                      {title}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="absolute top-[-3.3rem] left-[8rem]">
                  <SearchAccounts />
                </PopoverContent>
              </Popover>
            </div>
          )
        )}
      </nav>

      <div className="border-t border-gray-200 mx-4 my-2">
        {/* Followers Section */}
        <section className="px-5 space-y-4">
          <h3 className="font-semibold text-gray-800">
            My Followers ({followers.length})
          </h3>

          <div className="space-y-3 cursor-pointer">
            {isFetchingFollowers ? (
              <LoaderSpinner />
            ) : isError ? (
              <p className="text-red-500 text-sm">Failed to load followers</p>
            ) : followers.length === 0 ? (
              <p className="text-gray-500 text-sm">No followers yet</p>
            ) : (
              followers.map(({ profilePicture, userId, userName }) => (
                <div
                onClick={()=>{
                  dispatch(updateselectedUserProfileIdId(userId))
                  navigate("/profile");
                }}
                  key={userId}
                  className="flex gap-2 items-center hover:bg-gray-50
                 p-2 rounded transition-colors"
                >
                  <img
                    src={profilePicture}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="truncate">{userName}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeftSideBar;