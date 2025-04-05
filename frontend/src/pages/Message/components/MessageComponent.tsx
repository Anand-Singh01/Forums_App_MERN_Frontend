import React from "react";
import { useAppSelector } from "../../../state/hooks";

interface IMessageComponent {
  content: string;
  senderId: string;
  timestamp: Date;
  profilePicture: string;
}

const MessageComponent: React.FC<IMessageComponent> = ({
  content,
  timestamp,
  profilePicture,
  senderId,
}) => {
  const userId = useAppSelector((state) => state.userInfoSlice.userInfo.userId);
  const isCurrentUser = senderId === userId;

  return (
    <div
      className={`flex w-full ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`flex gap-2 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={profilePicture}
          alt="Profile"
        />

        <div>
          <div
            className={`px-5 py-2 rounded-full max-w-xs md:max-w-md ${
              isCurrentUser
                ? "bg-[#218aff] text-white"
                : "bg-[#1ac493] text-white"
            }`}
          >
            <p className="break-words">{content}</p>
          </div>
          <p className="text-xs text-right mt-1 text-gray-400">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
