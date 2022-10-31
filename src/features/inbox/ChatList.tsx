import { ProfilePicture, TwButton } from "components";
import React, { useEffect, useState } from "react";
import { GroupChat, User, UserChatArray } from "interfaces";
import { getChatState } from "./chatReducer";
import { useAppSelector } from "hooks";
import { useFormatDate, useGetUser, useGetUserStatus } from "hooks";
import { doc, getDoc, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { db } from "setup/firebase";
import { Unsubscribe } from "firebase/auth";

interface ChatListProps {
  chat: UserChatArray;
  chatClickHandler: (recipient: User | GroupChat, isGroup: boolean) => void;
}

const ChatList = ({ chat, chatClickHandler }: ChatListProps): JSX.Element => {
  const [recipient, setRecipient] = useState<User | GroupChat>();
  const [isGroup, setIsGroup] = useState(false);
  const [lastMsgDate, setLastMsgDate] = useState("");

  const { chatId } = useAppSelector(getChatState);

  const online = !chat[1].isGroup && useGetUserStatus(chat[1].userInfo.uid);

  const formatDate = useFormatDate();
  const getUserInfo = useGetUser();

  const chatListClickHandler = () => {
    if (isGroup && recipient) {
      return chatClickHandler(recipient as GroupChat, isGroup);
    }

    chatClickHandler(recipient as User, isGroup);
  };

  useEffect(() => {
    let unsub: Unsubscribe;

    if (chat[1].isGroup) {
      const groupChatDoc = doc(db, "groupChats", chat[1].groupID);
      unsub = onSnapshot(groupChatDoc, (doc) => {
        const groupChatData = doc.data();

        if (!groupChatData) return;

        const date = formatDate(groupChatData.lastMessage.date.toDate());
        setLastMsgDate(date as string);
        setRecipient(doc.data() as GroupChat);
      });

      return setIsGroup(true);
    }

    setIsGroup(false);

    const recipientUID = chat[1].userInfo.uid;
    getUserInfo(recipientUID).then((recipientInfo) => {
      setRecipient(recipientInfo);
    });

    return () => {
      unsub?.();
    };
  }, []);

  useEffect(() => {
    if (chat[1].isGroup) return;

    const date = formatDate(chat[1].lastMessage.date.toDate());
    setLastMsgDate(date as string);
  }, [chat[1].lastMessage.message]);

  return (
    <TwButton
      variant="transparent"
      onClick={chatListClickHandler}
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
          {recipient?.isGroup ? recipient?.groupName : recipient?.displayName}
        </h2>
        <div
          className={` flex gap-1 ${
            chat[1].unread
              ? "text-black dark:text-white "
              : "dark:text-muted-dark text-muted-light"
          } text-sm  `}
        >
          <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[7rem]">
            {chat[1].isGroup && recipient?.isGroup
              ? recipient?.lastMessage?.message
              : chat[1].lastMessage?.message}
          </p>
          <span>•</span>
          <time className="w-fit">{lastMsgDate}</time>
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
