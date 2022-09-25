import { useEffect, useRef, useState } from "react";
import { ErrorMsg } from "components";
import { inbox_empty } from "assets/images";

import ChatList from "./ChatList";
import { Chat, User } from "interfaces";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getUserState } from "features/authentication/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "services/firebase";
import { changeChat } from "./chatReducer";

const ChatsContainer = () => {
  const { user: currentUser } = useAppSelector(getUserState);
  const [chats, setChats] = useState<any>([]);
  const dispatch = useAppDispatch();

  const chatListRef = useRef<Chat>();

  const chatClickHandler = (e: React.MouseEvent, recipient: User) => {
    dispatch(changeChat(recipient));
  };

  useEffect(() => {
    if (!currentUser.uid) return;

    const userChatsDocRef = doc(db, "userChats", currentUser.uid);
    const unsub = onSnapshot(userChatsDocRef, async (doc) => {
      setChats({ ...doc.data() });
    });

    return () => {
      unsub();
    };
  }, [currentUser.uid]);
  return (
    <div className=" p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div className="flex flex-col gap-1">
        {Object.entries(chats).length ? (
          Object.entries(chats)
            .sort(
              (a: any, b: any) => b[1].lastMessage.date - a[1].lastMessage.date
            )
            .map((chat: any, i: number) => (
              <ChatList
                key={chat[0]}
                chat={chat}
                chatClickHandler={chatClickHandler}
              />
            ))
        ) : (
          <ErrorMsg
            img={inbox_empty}
            msg="Your inbox is empty"
            subMsg="Find a contact in AddContacts section."
          />
        )}
      </div>
    </div>
  );
};

export default ChatsContainer;
