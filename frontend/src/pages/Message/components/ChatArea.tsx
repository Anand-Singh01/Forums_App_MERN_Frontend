import React, { useEffect, useRef } from "react";
import { IConversationDto } from "../../../api/chatApi";
import ChatInput from "./ChatInput";
import MessageComponent from "./MessageComponent";

interface IChatArea {
  conversation: IConversationDto;
}

const DEFAULT_PROFILE_PIC = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const ChatArea: React.FC<IChatArea> = ({ conversation }) => {
  const { messages, participants } = conversation;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (conversation && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const getParticipantProfile = (senderId: string) => {
    const participant = participants.find((p) => p.userId === senderId);
    return participant?.profilePicture || DEFAULT_PROFILE_PIC;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Messages container */}
      <div
        ref={chatContainerRef}
        className="flex-1 flex flex-col gap-10 p-4 overflow-y-auto no-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <MessageComponent
              key={message.messageId}
              profilePicture={getParticipantProfile(message.senderId)}
              timestamp={message.createdAt}
              senderId={message.senderId}
              content={message.content}
            />
          ))
        )}
      </div>

      {/* Input area */}
      <div className="p-4">
      <ChatInput/>
      </div>
    </div>
  );
};

export default ChatArea;