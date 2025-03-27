import { Link } from "react-router-dom";
import { leftSideBarLinks } from "../../../utils/util";

const LeftSideBar = () => {
  return (
    <div className="w-[15rem] h-full bg-white pt-[0.5rem]">
      {leftSideBarLinks.map(({ Icon, path, title }) => {
        return (
          <Link
            className="flex py-3 px-5 hover:bg-blue-50 text-gray-500 
            font-semibold gap-3 items-center"
            to={path}
          >
            <Icon sx={{ color: "#6a7282" }} />
            <p className="">{title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default LeftSideBar;