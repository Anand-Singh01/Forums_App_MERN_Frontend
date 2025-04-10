import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { addCommentApi } from "../../../api/commentApi";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  qcUpdateCommentCount
} from "../../../state/tanstack/queryClient";
import LoaderSpinner from "../LoaderSpinner";

interface IAddCommentProps {
  profileImage: string;
  postId: string;
}

const AddComment = ({ profileImage, postId }: IAddCommentProps) => {
  const [comment, setComment] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: (obj: { postId: string; comment: string }) =>
      addCommentApi(obj.postId, obj.comment),
    onSuccess: (_, variables) => {
      qcUpdateCommentCount(variables.postId);
      toast.success("Comment added successfully!");
      setComment("");
    },
  });

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex gap-2 items-center grow">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="write a comment..."
        />
      </div>
      <Button
        disabled={isPending}
        onClick={() => mutate({ postId, comment })}
        className="bg-[#fb64b6] cursor-pointer hover:bg-purple-200"
      >
        {isPending ? (
          <LoaderSpinner />
        ) : (
          <ArrowForwardIosOutlinedIcon
            sx={{ color: "white", fontSize: "1rem" }}
          />
        )}
      </Button>
    </div>
  );
};

export default AddComment;
