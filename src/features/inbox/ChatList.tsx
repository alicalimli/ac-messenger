import { TwButton } from "components";
import React, { useEffect, useState } from "react";
import { User, Chat } from "interfaces";
import { getChatState } from "./chatReducer";
import { useAppSelector } from "app/hooks";
import { useFormatDate } from "hooks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "services/firebase";

interface ChatListProps {
  chat: any;
  chatClickHandler: (e: React.MouseEvent, recipient: User) => void;
}

const ChatList = ({ chat, chatClickHandler }: ChatListProps) => {
  const { chatId } = useAppSelector(getChatState);
  const [online, setOnline] = useState<boolean>(false);

  const formattedDate = useFormatDate(chat[1].lastMessage.date.toDate());

  const getUserStatus = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocData = (await getDoc(userDocRef)).data();
      setOnline(userDocData?.status === "online" ? true : false);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserStatus(chat[1].userInfo.uid);
  }, []);

  return (
    <TwButton
      variant="transparent"
      onClick={(e: React.MouseEvent) => chatClickHandler(e, chat[1].userInfo)}
      className={`w-full p-2 ${
        !chat[1].seen && "bg-muted-light/5 dark:bg-muted-dark/10"
      }  ${chat[0] === chatId && "bg-muted-light/10 dark:bg-muted-dark/20"}
     `}
    >
      <div className="relative bg-transparent h-14 w-14">
        <div
          className={`${
            online ? "bg-green-500 " : "bg-red-500 "
          }p-2 rounded-full absolute right-0 bottom-0`}
        ></div>
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

      <div className="flex flex-col gap-1 items-end ml-auto ">
        <div
          className={`${
            !chat[1].seen ? "p-1.5 w-fit bg-red-600 rounded-full" : ""
          }`}
        ></div>
        <time className="text-sm text-muted-light dark:text-muted-dark">
          {formattedDate}
        </time>
      </div>
    </TwButton>
  );
};

export default ChatList;
