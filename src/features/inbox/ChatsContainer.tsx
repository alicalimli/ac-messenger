import { useEffect, useState } from "react";
import { ErrorMsg, LoadingSpinner } from "components";
import { inbox_empty } from "assets/images";

import ChatList from "./ChatList";
import { User } from "interfaces";
import { useAppDispatch, useAppSelector } from "hooks";
import { getUserState } from "features/authentication/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";
import { changeChat, getChatState } from "./chatReducer";

const ChatsContainer = () => {
  const { user: currentUser } = useAppSelector(getUserState);
  const { chatId } = useAppSelector(getChatState);
  const [isPending, setIsPending] = useState<boolean>(false);

  const [chats, setChats] = useState<[]>([]);
  const dispatch = useAppDispatch();

  const chatClickHandler = (recipient: User, isGroup: boolean) => {
    console.log(isGroup);
    dispatch(changeChat({ recipient, isGroup }));
  };

  useEffect(() => {
    if (!currentUser.uid) return;
    setIsPending(true);

    const userChatsDocRef = doc(db, "userChats", currentUser.uid);
    const unsub = onSnapshot(userChatsDocRef, async (doc) => {
      const chats = Object.entries({ ...doc.data() });
      setChats(chats);
      setIsPending(false);
    });

    return () => {
      unsub();
    };
  }, [currentUser.uid]);
  return (
    <div className="p-4 flex flex-col gap-2 h-full">
      <h1 className="ml-4 text-black dark:text-white text-2xl">Chats</h1>
      <div className="relative flex flex-col overflow-scroll scrollbar-hide">
        {chats.length !== 0 &&
          chats
            .sort(
              (a: any, b: any) =>
                b[1].lastMessage?.date - a[1].lastMessage?.date
            )
            .map((chat: any, i: number) => (
              <ChatList
                key={chat[0]}
                chat={chat}
                chatClickHandler={chatClickHandler}
              />
            ))}

        {chats.length === 0 && !isPending && (
          <ErrorMsg
            img={inbox_empty}
            msg="Your inbox is empty"
            subMsg="Find a contact in AddContacts section."
          />
        )}

        {isPending && <LoadingSpinner msg="Fetching chats..." />}
      </div>
    </div>
  );
};

export default ChatsContainer;
