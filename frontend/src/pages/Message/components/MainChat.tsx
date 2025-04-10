import { useQuery } from "@tanstack/react-query";
import { getAllConversations } from "../../../api/chatApi";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import { useAppSelector } from "../../../state/hooks";
import ChatArea from "./ChatArea";
import SelectedUserInfo from "./SelectedUserInfo";

const MainChat = () => {
  const receiverId = useAppSelector(
    (state) => state.chatSlice.activeParticipant?.userId
  );

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["conversation", receiverId],
    enabled: receiverId !== undefined,
    queryFn: () =>
      receiverId
        ? getAllConversations(receiverId)
        : Promise.reject("Receiver ID is undefined"),
  });
  if (isPending) {
    return <LoaderSpinner />;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
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