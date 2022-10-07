import { TwButton } from "components";
import React, { useEffect, useState } from "react";
import { User } from "interfaces";
import { getChatState } from "./chatReducer";
import { useAppSelector } from "app/hooks";
import { useFormatDate, useGetUserStatus } from "hooks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase";

interface ChatListProps {
  chat: any;
  chatClickHandler: (e: React.MouseEvent, recipient: User) => void;
}

const ChatList = ({ chat, chatClickHandler }: ChatListProps) => {
  const [recipient, setRecipient] = useState<User>();
  const online = useGetUserStatus(chat[1].userInfo.uid);
  const { chatId } = useAppSelector(getChatState);
  const formattedDate = useFormatDate(chat[1].lastMessage.date.toDate());

  const getUserData = async (userId: string) => {
    const recipientDocRef = doc(db, "users", userId);
    const recipientData = (await getDoc(recipientDocRef)).data();
    console.log(recipientData);
    setRecipient({ ...recipientData } as User);
  };

  useEffect(() => {
    getUserData(chat[1].userInfo.uid);
  }, []);

  return (
    <TwButton
      variant="transparent"
      onClick={(e: React.MouseEvent) => chatClickHandler(e, chat[1].userInfo)}
      className={`w-full p-2 ${
        chat[1].unread && "bg-muted-light/5 dark:bg-muted-dark/10"
      }  ${chat[0] === chatId && "bg-muted-light/10 dark:bg-muted-dark/20"}
     `}
    >
      <div className="relative bg-transparent h-14 w-14 shrink-0">
        <div
          className={`${
            online && "bg-green-500 "
          }p-1.5 rounded-full absolute right-0 bottom-0`}
        ></div>
        <img src={recipient?.photoURL || ""} className="w-full rounded-full" />
      </div>
      <div className="flex flex-col items-start">
        <h2 className="text-xl text-black dark:text-white">
          {recipient?.displayName}
        </h2>
        <div
          className={` flex gap-1 ${
            chat[1].unread
              ? "font-bold dark:text-white"
              : "dark:text-muted-dark"
          } text-sm text-muted-light `}
        >
          <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[10rem]">
            {chat[1].lastMessage?.message || ""}
          </p>
          <span>•</span>
          <time className="">{formattedDate}</time>
        </div>
      </div>

      {chat[1].unread && (
        <div className="flex flex-col gap-1 items-end ml-auto ">
          <div className="w-5 p-0.5 text-center text-white bg-primary-main rounded-full">
            <p className="text-xs">{chat[1].unreadMsgCount}</p>
          </div>
        </div>
      )}
    </TwButton>
  );
};

export default ChatList;
