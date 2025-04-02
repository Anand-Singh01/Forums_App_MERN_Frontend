import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { getAllReplyApi, IReplyDto } from "../../../../../api/commentApi";
import LoaderSpinner from "../../../../../shared/components/LoaderSpinner";

interface ReplySectionProps {
  commentId: string;
}

const ReplySection = ({ commentId }: ReplySectionProps) => {
  const { data: replies = [], isPending: isFetchingReplies } = useQuery<IReplyDto[]>({
    queryKey: ["replies", commentId],
    queryFn: () => getAllReplyApi(commentId),
  });

  if (isFetchingReplies) {
    return (
      <div className="flex justify-center py-4">
        <LoaderSpinner />
      </div>
    );
  }

  if (replies.length === 0) {
    return (
      <div className="text-center py-2 text-gray-500 text-sm">
        No replies yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {replies.map(({ reply, replyBy, updatedAt, replyId }) => (
        <div key={replyId} className="flex gap-3">
          <img
            className="w-6 h-6 rounded-full object-cover mt-1 flex-shrink-0"
            src={replyBy.profilePicture}
            alt={`${replyBy.userName}'s profile`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-profile.png";
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-xs truncate">
                {replyBy.userName}
              </span>
              <span className="text-[10px] text-gray-500 flex-shrink-0">
                {formatDistanceToNow(new Date(updatedAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-xs mt-1 break-words whitespace-pre-line">{reply}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplySection;