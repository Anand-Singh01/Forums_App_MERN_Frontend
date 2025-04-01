import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";
import { getAllCommentsApi, ICommentDto } from "../../../../../api/commentApi";
import { Button } from "../../../../../components/ui/button";
import LoaderSpinner from "../../../../../shared/components/LoaderSpinner";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const {
    data: comments = [],
    isPending,
    isError,
    refetch,
  } = useQuery<ICommentDto[]>({
    queryKey: ["comments", postId],
    queryFn: () => getAllCommentsApi(postId),
    retry: false,
  });

  if (isPending) {
    return (
      <div className="flex justify-center py-8">
        <LoaderSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-2">Failed to load comments</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="text-sm"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-2">
      {comments.map(
        ({ comment, commentId, commentedBy, updatedAt, replyCount, likes }) => (
          <div
            key={commentId}
            className="group relative hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="flex gap-3">
              <img
                className="w-8 h-8 rounded-full object-cover mt-1 flex-shrink-0"
                src={commentedBy.profilePicture}
                alt={`${commentedBy.userName}'s profile`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-profile.png";
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-sm truncate">
                    {commentedBy.userName}
                  </span>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatDistanceToNow(new Date(updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm mt-1 break-words">{comment}</p>

                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 cursor-pointer px-2 text-xs text-gray-500 hover:bg-gray-200"
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {replyCount} {replyCount === 1 ? "reply" : "replies"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CommentSection;
