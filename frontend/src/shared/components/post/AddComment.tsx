import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

interface IAddCommentProps {
  profileImage: string;
}

const AddComment = ({ profileImage }: IAddCommentProps) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex gap-2 items-center grow">
        <div className="size-10">{<img src={profileImage} alt="" />}</div>
        <Input placeholder="write a comment..." />
      </div>
      <Button className="bg-[#fb64b6] cursor-pointer hover:bg-purple-200">
        <ArrowForwardIosOutlinedIcon
          sx={{ color: "white", fontSize: "1rem" }}
        />
      </Button>
    </div>
  );
};

export default AddComment;