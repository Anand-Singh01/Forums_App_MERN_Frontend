import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { getAllFollowers } from "../../../api/follower-followApi";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import { leftSideBarLinks } from "../../../utils/util";

interface Follower {
  profilePicture: string;
  userId: string;
  userName: string;
}

const MAX_FOLLOWERS_DISPLAY = 5;

const LeftSideBar = () => {
  const {
    data: followers = [],
    isPending: isFetchingFollowers,
    isError,
  } = useQuery<Follower[]>({
    queryKey: ["followers"],
    queryFn: getAllFollowers,
    initialData: [],
    retry: 1,
  });

  let currentElement:
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
    case "/liked":
      currentElement = "My Liked";
      break;
    default:
      currentElement = "Feed";
      break;
  }

  const displayedFollowers = followers.slice(0, MAX_FOLLOWERS_DISPLAY);

  return (
    <div className="w-[15rem] h-full flex flex-col bg-white pt-4 space-y-4 text-base sticky top-0">
      {/* Navigation Links */}
      <nav>
        {leftSideBarLinks.map(({ Icon, path, title }, index) => (
          <Link
            key={path || index}
            to={path}
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
        ))}
      </nav>

      <div className="border-t border-gray-200 mx-4 my-2"></div>

      {/* Followers Section */}
      <section className="px-5 space-y-4">
        <h3 className="font-semibold text-gray-800">My Followers</h3>

        <div className="space-y-3">
          {isFetchingFollowers ? (
            <LoaderSpinner />
          ) : isError ? (
            <p className="text-red-500 text-sm">Failed to load followers</p>
          ) : displayedFollowers.length === 0 ? (
            <p className="text-gray-500 text-sm">No followers yet</p>
          ) : (
            displayedFollowers.map(({ profilePicture, userId, userName }) => (
              <Link
                to={`/profile/${userId}`}
                key={userId}
                className="flex gap-2 items-center hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <img src={profilePicture} className="w-8 h-8" />
                <span className="truncate">{userName}</span>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default LeftSideBar;