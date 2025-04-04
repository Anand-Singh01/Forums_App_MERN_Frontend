import ChatSidebar from "./components/ChatSidebar";
import MainChat from "./components/MainChat";

const Message = () => {
  return (
    <div className="flex h-full">
      <ChatSidebar />
      <MainChat />
    </div>
  );
};

export default Message;
