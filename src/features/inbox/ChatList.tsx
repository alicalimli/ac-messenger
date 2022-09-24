import { TwButton } from "components";
import React from "react";
import { User, Chat } from "interfaces";
import { getChatState } from "./chatReducer";
import { useAppSelector } from "app/hooks";

interface ChatListProps {
  chats: any;
  chatClickHandler: (e: React.MouseEvent, recipient: User) => void;
}

const ChatList = ({ chats, chatClickHandler }: ChatListProps) => {
  const { chatId } = useAppSelector(getChatState);

  return chats
    .sort((a: any, b: any) => b[1].lastMessage.date - a[1].lastMessage.date)
    .map((chat: any, i: number) => (
      <TwButton
        variant="transparent"
        onClick={(e: React.MouseEvent) => chatClickHandler(e, chat[1].userInfo)}
        key={chat[0]}
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
      </TwButton>
    )) as unknown as JSX.Element;
};

export default ChatList;
