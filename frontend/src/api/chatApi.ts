import axios from "axios";

export interface IParticipantDto {
  userId: string;
  profilePicture: string;
  userName: string;
  isFollowing?: boolean;
}

export interface IConversationDto {
  conversationId: string;
  participants:     {
    userId: string;
    userName: string;
    profilePicture: string;
  }[];
  messages:     {
    messageId: string;
    content: string;
    isEdited: boolean;
    senderId: string;
    createdAt: Date;
  }[];
}

export const getAllChatPartners = async (): Promise<IParticipantDto[]> => {
  const response = await axios.get("/conversation/getChatPartners", {
    withCredentials: true,
  });
  return response.data.data;
};

export const getAllConversations = async (receiverId:string): Promise<IConversationDto> => {
  const response = await axios.get(`/conversation/get-all-messages/${receiverId}`, {
    withCredentials: true,
  });
  return response.data.data;
};