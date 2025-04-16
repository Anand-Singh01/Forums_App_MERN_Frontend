import { useMutation } from "@tanstack/react-query";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { addCommentApi, addReplyApi } from "../../../../../api/commentApi";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import LoaderSpinner from "../../../../../shared/components/LoaderSpinner";
import { useAppDispatch, useAppSelector } from "../../../../../state/hooks";
import { updatesSelectedCommentForReply } from "../../../../../state/slices/postSlice";
import {
  qcAddComment,
  qcAddReply,
  qcUpdateCommentCount,
  qcUpdateReplyCount,
} from "../../../../../state/tanstack/queryClient";

interface AddCommentInputProps {
  postId: string;
}

const AddCommentInput = ({ postId }: AddCommentInputProps) => {
  const [comment, setComment] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { commentId, userName } = useAppSelector(
    (state) => state.postSlice.selectedCommentForReply
  );
  const selectedCommentIdForReply = useAppSelector(
    (state) => state.postSlice.selectedCommentForReply.commentId
  );
  const isReplyActive = selectedCommentIdForReply !== null;

  const { mutate: addCommentMutate, isPending: isAddingComment } = useMutation({
    mutationFn: (obj: { postId: string; comment: string }) =>
      addCommentApi(obj.postId, obj.comment),
    onSuccess: (newComment) => {
      qcAddComment(newComment, postId);
      qcUpdateCommentCount(postId);
      setComment("");
      toast.success("Comment added successfully!");
      inputRef.current?.focus();
    },
    onError: () => {
      toast.error("Failed to add comment. Please try again.");
    },
  });

  const { mutate: addReplyMutate, isPending: isAddingReply } = useMutation({
    mutationFn: (obj: { commentId: string; reply: string; postId: string }) =>
      addReplyApi(obj.commentId, obj.reply),
    onSuccess: (newReply, obj) => {
      qcAddReply(newReply, obj.commentId);
      qcUpdateReplyCount(obj.postId, obj.commentId);
      setComment("");
      toast.success("Reply added successfully!");
      inputRef.current?.focus();
    },
    onError: () => {
      toast.error("Failed to add reply. Please try again.");
    },
  });

  useEffect(() => {
    return () => {
      dispatch(
        updatesSelectedCommentForReply({ commentId: null, userName: null })
      );
    };
  }, [dispatch]);

  const handleSubmit = () => {
    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      toast.warning("Comment cannot be empty");
      return;
    }
    if (!isReplyActive) {
      addCommentMutate({ postId, comment: trimmedComment });
      return;
    }
    if (!commentId) {
      toast.warning("Comment has to be selected for reply");
      return;
    }
    addReplyMutate({ commentId, reply: comment, postId });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            commentId ? `Replying to @${userName}` : "Add a comment..."
          }
          className="flex-1 rounded-full px-4 py-2"
          disabled={isAddingComment}
        />
        <Button
          onClick={handleSubmit}
          className="rounded-full bg-[#fb64b6] hover:bg-[#e055a5] h-10 w-10 p-0"
          disabled={isAddingReply || isAddingComment || !comment.trim()}
          aria-label="Post comment"
        >
          {isAddingComment || isAddingReply ? (
            <LoaderSpinner />
          ) : (
            <SendHorizonal className="h-5 w-5" />
          )}
        </Button>
      </div>
      {commentId && (
        <div className="text-xs text-gray-500 mt-1 flex items-center">
          <span>Replying to @{userName}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 ml-2 text-xs"
            onClick={() => {
              dispatch(
                updatesSelectedCommentForReply({
                  commentId: null,
                  userName: null,
                })
              );
              setComment("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddCommentInput;