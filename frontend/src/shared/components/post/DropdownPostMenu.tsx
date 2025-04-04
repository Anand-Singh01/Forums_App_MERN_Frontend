import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useAppSelector } from "../../../state/hooks";

interface IDropdownMenuProps {
  postId: string;
  postedById: string;
}
const DropdownPostMenu = ({ postId, postedById }: IDropdownMenuProps) => {
  const currentUserId = useAppSelector(
    (state) => state.userInfoSlice.userInfo.userId
  );
  console.log(currentUserId, "  ", postedById);
  return (
    <div
      className={`absolute top-2 right-2 cursor-pointer z-10 bg-white/80 
      rounded-full p-1 hover:bg-gray-200 transition-colors`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertIcon sx={{ color: "gray" }} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Save</DropdownMenuItem>
          {currentUserId === postedById && (
            <DropdownMenuItem>Edit</DropdownMenuItem>
          )}
          {currentUserId === postedById && (
            <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownPostMenu;