import { IConversationDto } from "../../../api/chatApi";
import ChatArea from "./ChatArea";
import SelectedUserInfo from "./SelectedUserInfo";

interface IMainChat{
  data:IConversationDto 
}
const MainChat = ({data}:IMainChat) => {
  return (
    <div className="flex w-full">
      <section className="w-full">
        <ChatArea conversation={data} />
      </section>
      <section className="w-[25rem]">
        <SelectedUserInfo />
      </section>
    </div>
  );
};

export default MainChat;