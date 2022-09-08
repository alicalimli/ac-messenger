import { useContext, useRef } from "react";
import { ErrorMsg } from "/src/components";
import { inbox_empty } from "/src/assets/images";

import {
  CurrentChatContext,
  UserContext,
} from "/src/setup/app-context-manager";
import ChatList from "./ChatList";

const ChatsContainer = () => {
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);
  const [userInfo, setUserInfo] = useContext(UserContext);

  const chats = userInfo.inbox;

  const chatListRef = useRef();

  const chatClickHandler = (e, chat) => {
    if (chatListRef.current) {
      chatListRef.current.active_chat = false;
    }

    Object.assign(chat, { active_chat: true });
    chatListRef.current = chat;
    setCurrentChat(chat);
  };

  return (
    <div className=" p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div>
        {chats.length ? (
          <ChatList
            chats={chats}
            currentUser={userInfo}
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
