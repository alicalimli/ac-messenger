import { useEffect, useState } from "react";
import { ErrorMsg } from "components";
import { inbox_empty } from "assets/images";

import ChatList from "./ChatList";
import { User } from "interfaces";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getUserState } from "features/authentication/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "services/firebase";
import { changeChat, getChatState } from "./chatReducer";

const ChatsContainer = () => {
  const { user: currentUser } = useAppSelector(getUserState);
  const { chatId } = useAppSelector(getChatState);

  const [chats, setChats] = useState<any>([]);
  const dispatch = useAppDispatch();

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
      <div className="flex gap-2 items-center text-black dark:text-white px-4 border-b  border-muted-light/10 dark:border-muted-dark/10 pb-4">
        <div className="bg-transparent h-12 w-12">
          {currentUser.status === "on" && (
            <div className="bg-green-500 p-1.5 rounded-full absolute right-1 bottom-0"></div>
          )}
          <img src={currentUser.photoURL} className="w-full rounded-full" />
        </div>
        {currentUser.displayName}
      </div>
      <div className="flex flex-col gap-1">
        {Object.entries(chats).length !== 0 ? (
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
