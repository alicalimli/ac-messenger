import { TwButton } from "components";
import React from "react";
import { User, Chat } from "interfaces";
import { getChatState } from "./chatReducer";
import { useAppSelector } from "app/hooks";
import { useFormatDate } from "hooks";

interface ChatListProps {
  chat: any;
  chatClickHandler: (e: React.MouseEvent, recipient: User) => void;
}

const ChatList = ({ chat, chatClickHandler }: ChatListProps) => {
  const { chatId } = useAppSelector(getChatState);

  const formattedDate = useFormatDate(chat[1].lastMessage.date.toDate());

  return (
    <TwButton
      variant="transparent"
      onClick={(e: React.MouseEvent) => chatClickHandler(e, chat[1].userInfo)}
      className={`w-full p-2 ${
        chat[0] === chatId && "bg-muted-light/5 dark:bg-muted-dark/10 "
      }`}
    >
      <div className="relative bg-transparent h-14 w-14">
        <div className="bg-green-500 p-2 rounded-full absolute right-0 bottom-0"></div>
        <img
          src={chat[1].userInfo.photoURL || ""}
          className="w-full rounded-full"
        />
      </div>
      <div className="flex flex-col items-start">
        <h2 className="text-xl text-black dark:text-white">
          {chat[1].userInfo.displayName}
        </h2>
        <p className="text-sm text-muted-light dark:text-muted-dark">
          {chat[1].lastMessage?.message || ""}
        </p>
      </div>

      <time className="text-sm ml-auto text-muted-light dark:text-muted-dark">
        {formattedDate}
      </time>
    </TwButton>
  );
};

export default ChatList;
