import { useContext, useRef } from "react";
import { TwTrnButton } from "/src/components";
import { useGetChats } from "../hooks";
import {inbox_empty} from '/src/assets/images'

import { CurrentChatContext } from "/src/setup/app-context-manager";
import ChatList from "./ChatList";

const ChatsContainer = () => {
  const chats = useGetChats();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

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
        {chats.length ? <ChatList chats={chats} chatClickHandler={chatClickHandler} /> :
        <img src={inbox_empty} alt="" /> }
      </div>
    </div>
  );
};

export default ChatsContainer;
