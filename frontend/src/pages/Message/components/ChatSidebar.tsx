import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllChatPartners, IParticipantDto } from "../../../api/chatApi";
import { Input } from "../../../components/ui/input";
import Participants from "./Participants";

const ChatSidebar = () => {
  const queryRes = useQuery({
    queryKey: ["participants"],
    queryFn: getAllChatPartners,
  });
  const [filteredParticipants, setFilteredParticipants] = useState<
    IParticipantDto[]
  >([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (queryRes.data && queryRes.data.length > 0) {
      setFilteredParticipants(
        queryRes.data.filter(({ userName }) => {
          return userName.toLowerCase().includes(inputText.toLowerCase());
        })
      );
    }
  }, [inputText, queryRes.data]);
  return (
    <div className="w-[20rem] h-full pt-2 px-5 flex flex-col gap-5">
      <Input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="p-5 bg-white"
        placeholder="search or start a new chat"
      />
      <Participants
        queryRes={queryRes}
        filteredParticipants={filteredParticipants}
      />
    </div>
  );
};

export default ChatSidebar;