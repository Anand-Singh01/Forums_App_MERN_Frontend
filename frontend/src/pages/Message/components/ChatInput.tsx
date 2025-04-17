import SendIcon from "@mui/icons-material/Send";
import { KeyboardEvent, useState } from "react";
import { Input } from "../../../components/ui/input";
import { useAppSelector } from "../../../state/hooks";
import { qcAddMessageToConversation } from "../../../state/tanstack/queryClient";
import WebSocketManager, {
  IWebsocketMessage,
} from "../../../state/ws/webSocketManager";
import audio from "../../../utils/audio/sentmessage_1.mp3";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const sendSound = new Audio(audio);
  const wsManager = WebSocketManager.getInstance();
  const { senderId, receiverId, isConnected } = useAppSelector((state) => ({
    senderId: state.userInfoSlice.userInfo.userId,
    receiverId: state.chatSlice.activeParticipant?.userId,
    isConnected: state.wsSlice.readyState === WebSocket.OPEN,
  }));
  const currentUserinfo = {
    userId: senderId,
    userName: useAppSelector(state => state.userInfoSlice.userInfo.userName),
    profilePicture: useAppSelector(state => state.userInfoSlice.userInfo.profileName),
  }

  const friendInfo = {
    userId: receiverId,
    userName: useAppSelector(state => state.chatSlice.activeParticipant?.userName),
    profilePicture: useAppSelector(state => state.chatSlice.activeParticipant?.profilePicture),
  }

  const handleSendMessage = async () => {
    if (isConnected && receiverId && message.trim()) {
      wsManager.sendMessage({
        message,
        receiverId,
        senderId,
        type: "message",
      } as IWebsocketMessage<string>);
      qcAddMessageToConversation(["conversation", receiverId], message, senderId, currentUserinfo, friendInfo);
      sendSound.play();
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex items-center gap-2 px-3 py-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
        className="flex-1 border-none bg-white focus-visible:ring-0"
        aria-label="Message input"
      />
      <button
        onClick={handleSendMessage}
        // disabled={!isConnected || !message.trim()}
        className="cursor-pointer transition-colors"
        aria-label="Send message"
      >
        <SendIcon sx={{ color: message.trim() ? "#ff33b8" : "gray" }} />
      </button>
    </div>
  );
};

export default ChatInput;