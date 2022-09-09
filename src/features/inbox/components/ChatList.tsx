import { TwButton } from "components";
import { UsersData, ChatsData } from "localdatas";
import User from "interfaces/users";
import React from "react";
import Chat from "interfaces/chats";

interface ChatListProps {
  chats: string[];
  currentUser: User;
  chatClickHandler: (e: React.MouseEvent, chat: Chat) => void;
}

const ChatList = ({ chats, currentUser, chatClickHandler }: ChatListProps) => {
  const getRecipient = (chatRoom: string) => {
    const recipientId = Number(
      chatRoom.split("-").find((id) => +id !== currentUser.user_id)
    );
    const recipientInfo = UsersData.find(
      (user) => user.user_id === recipientId
    );
    console.log(recipientId, recipientInfo);

    return recipientInfo;
  };

  return chats.map((chatRoomId: string, i: number): JSX.Element | null => {
    const recipient = getRecipient(chatRoomId);
    const chatRoom = ChatsData.find((chatRoom) => {
      return chatRoom.chat_room_id === chatRoomId;
    });

    if (!recipient || !chatRoom) return null;

    return (
      <TwButton
        variant="transparent"
        onClick={(e: React.MouseEvent) => chatClickHandler(e, chatRoom)}
        key={i}
        className={`w-full p-2 ${
          chatRoom?.active_chat && "bg-muted-light/5 dark:bg-muted-dark/10 "
        }`}
      >
        <div className="relative bg-transparent h-16 w-16">
          <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
          <img src={recipient.profile} className="w-full rounded-full" />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-xl text-black dark:text-white">
            {recipient.username}
          </h2>
          <p className="text-sm text-muted-light dark:text-muted-dark">
            {chatRoom.last_message}
          </p>
        </div>
      </TwButton>
    );
  });
};

export default ChatList;
