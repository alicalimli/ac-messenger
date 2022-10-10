import { ProfilePicture, TwButton } from "components";
import React, { useEffect, useState } from "react";
import { User } from "interfaces";
import { getChatState } from "./chatReducer";
import { useAppSelector } from "hooks";
import { useFormatDate, useGetUser, useGetUserStatus } from "hooks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "setup/firebase";

interface ChatListProps {
  chat: any;
  chatClickHandler: (e: React.MouseEvent, recipient: User) => void;
}

const ChatList = ({ chat, chatClickHandler }: ChatListProps) => {
  const [recipient, setRecipient] = useState<User | any>();

  const { chatId } = useAppSelector(getChatState);

  const online = !chat[1].isGroup && useGetUserStatus(chat[1].userInfo.uid);
  const formattedDate =
    !chat[1].isGroup && useFormatDate(chat[1].lastMessage.date.toDate());

  const getUserInfo = useGetUser();

  useEffect(() => {
    if (chat[1].isGroup) {
      const groupChatDoc = doc(db, "userChats", chat[1].groupID);
      const groupChatData = getDoc(groupChatDoc).then((doc) => {
        setRecipient(doc.data());
      });
      return;
    }

    const recipientUID = chat[1].userInfo.uid;
    getUserInfo(recipientUID).then((recipientInfo) =>
      setRecipient(recipientInfo)
    );
  }, []);

  return (
    <TwButton
      variant="transparent"
      onClick={(e: React.MouseEvent) => chatClickHandler(e, recipient as User)}
      className={`w-full p-2 ${
        chat[1].unread && "bg-muted-light/5 dark:bg-muted-dark/10"
      }  ${chat[0] === chatId && "bg-muted-light/10 dark:bg-muted-dark/20"}
     `}
    >
      <ProfilePicture
        photoURL={recipient?.photoURL}
        isOnline={online}
        size="medium"
      />
      <div className="flex flex-col items-start">
        <h2 className="text-xl text-black dark:text-white">
          {recipient?.displayName || recipient?.groupName}
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
