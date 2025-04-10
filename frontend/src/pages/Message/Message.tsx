import ChatSidebar from "./components/ChatSidebar";
import MainChat from "./components/MainChat";

const Message = () => {
  return (
    <div className="flex h-[calc(100vh-200px)]">
      <ChatSidebar />
      <MainChat />
    </div>
  );
};

export default Message;
