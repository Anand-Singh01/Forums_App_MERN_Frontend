import { useEffect, useState } from "react";
import { IParticipantDto } from "../../../api/chatApi";
import { Input } from "../../../components/ui/input";
import Participants from "./Participants";
interface ChatSidebarProps {
  participants: IParticipantDto[];
}
const ChatSidebar = ({ participants }: ChatSidebarProps) => {

  const [filteredParticipants, setFilteredParticipants] = useState<
    IParticipantDto[]
  >([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (participants && participants.length > 0) {
      setFilteredParticipants(
        participants.filter(({ userName }) => {
          return userName.toLowerCase().includes(inputText.toLowerCase());
        })
      );
    }
  }, [inputText, participants]);

  
  return (
    <div className="w-[20rem] h-full pt-2 px-5 flex flex-col gap-5">
      <Input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="p-5 bg-white"
        placeholder="search or start a new chat"
      />
      <Participants
        queryRes={participants}
        filteredParticipants={filteredParticipants}
      />
    </div>
  );
};

export default ChatSidebar;