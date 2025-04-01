import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addCommentApi } from "../../../../../api/commentApi";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import LoaderSpinner from "../../../../../shared/components/LoaderSpinner";
import {
  qcAddComment
} from "../../../../../state/tanstack/queryClient";

interface AddCommentInputProps {
  postId: string;
}

const AddCommentInput = ({ postId }: AddCommentInputProps) => {
  const [comment, setComment] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (obj: { postId: string; comment: string }) =>
      addCommentApi(obj.postId, obj.comment),

    onSuccess: (newComment) => {
      qcAddComment(newComment, postId);
      //qcUpdateCommentCount(postId);

    },
  });

  return (
    <div className="p-4 border-t flex  gap-2 border-gray-200">
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="add a comment..."
      />
      <Button
        onClick={() => mutate({ postId, comment })}
        className="bg-[#fb64b6]"
      >
        {isPending ? <LoaderSpinner /> : "Add"}
      </Button>
    </div>
  );
};

export default AddCommentInput;