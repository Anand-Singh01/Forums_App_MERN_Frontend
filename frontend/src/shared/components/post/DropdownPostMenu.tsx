import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useAppDispatch } from "../../../state/hooks";
import { updateSelectedPostToDelete, updateSelectedPostToEdit } from "../../../state/slices/postSlice";

interface DropdownPostMenuProps {
  postId: string;
}
const DropdownPostMenu = ({ postId }: DropdownPostMenuProps) => {
  const dispatch = useAppDispatch();
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
          <DropdownMenuItem
            onClick={() => dispatch(updateSelectedPostToEdit(postId))}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
          onClick={() => dispatch(updateSelectedPostToDelete(postId))} className="text-red-400"
          >Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownPostMenu;