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
    // if (chatListRef.current) {
    //   chatListRef.current.active_chat = false;
    // }
    // Object.assign(chat, { active_chat: true });
    // chatListRef.current = chat;
  };

  useEffect(() => {
    if (!currentUser.uid) return;

    const userChatsDocRef = doc(db, "userChats", currentUser.uid);
    const unsub = onSnapshot(userChatsDocRef, async (doc) => {
      setChats({ ...doc.data() });
      console.log(doc.data());
      console.log(chats);
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <div className=" p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div className="flex flex-col gap-1">
        {Object.entries(chats).length ? (
          <ChatList
            chats={Object.entries(chats)}
            chatClickHandler={chatClickHandler}
          />
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
