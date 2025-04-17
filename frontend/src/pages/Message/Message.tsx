import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getAllChatPartners, getAllConversations, IConversationDto, IParticipantDto } from "../../api/chatApi";
import LoaderSpinner from "../../shared/components/LoaderSpinner";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updateActiveParticipant } from "../../state/slices/chatSlice";
import ChatSidebar from "./components/ChatSidebar";
import MainChat from "./components/MainChat";

const Message = () => {
  const dispatch = useAppDispatch();
  const activeParticipant = useAppSelector((state) => state.chatSlice.activeParticipant);

  // First, fetch all chat partners
  const {
    data: participants,
    isLoading: isParticipantsLoading,
    isError: isParticipantsError,
    error: participantsError,
  } = useQuery<IParticipantDto[]>({
    queryKey: ["participants"],
    queryFn: getAllChatPartners,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Then fetch conversations for the active participant
  const {
    data: conversation,
    isPending: isConversationPending,
    isError: isConversationError,
    error: conversationError,
    isFetching: isConversationFetching,
  } = useQuery<IConversationDto>({
    queryKey: ["conversation", activeParticipant?.userId],
    queryFn: () => {
      if (!activeParticipant?.userId) throw new Error("No participant selected");
      return getAllConversations(activeParticipant.userId);
    },
    enabled: !!activeParticipant?.userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Set first participant as active if none is selected and we have participants
  useEffect(() => {
    if (!activeParticipant && participants?.length) {
      dispatch(updateActiveParticipant(participants[0]));
    }
  }, [activeParticipant, participants, dispatch]);

  if (isParticipantsLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  if (isParticipantsError) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center text-red-500">
          <p>Failed to load participants</p>
          <p className="text-sm">{participantsError.message}</p>
        </div>
      </div>
    );
  }

  if (isConversationError) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center text-red-500">
          <p>Failed to load conversation</p>
          <p className="text-sm">{conversationError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className={`w-80 border-r ${isConversationFetching ? "opacity-70" : ""}`}>
        <ChatSidebar participants={participants || []} />
      </div>
      <div className="flex-1 flex flex-col">
        {activeParticipant ? (
          isConversationPending ? (
            <div className="flex flex-1 items-center justify-center">
              <LoaderSpinner />
            </div>
          ) : conversation ? (
            <MainChat data={conversation} />
          ) : null
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-500">No participants available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;