import { useRef } from "react";
import { ErrorMsg } from "components";
import { inbox_empty } from "assets/images";

import ChatList from "./ChatList";
import { Chat } from "interfaces";
import { useAppSelector } from "app/hooks";

const ChatsContainer = () => {
  // const [currentChat, setCurrentChat] = useContext(CurrentChatContext);
  const user = useAppSelector((state: any) => state.user.value);

  const chats = user.inbox;

  const chatListRef = useRef<Chat>();

  const chatClickHandler = (e: React.MouseEvent, chat: Chat) => {
    if (chatListRef.current) {
      chatListRef.current.active_chat = false;
    }

    Object.assign(chat, { active_chat: true });
    chatListRef.current = chat;
    // setCurrentChat(chat);
  };

  return (
    <div className=" p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div>
        {chats.length ? (
          <ChatList
            chats={chats}
            currentUser={user}
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
