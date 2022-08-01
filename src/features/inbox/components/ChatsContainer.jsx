import { useContext } from "react";
import { TwTrnButton } from "/src/components";
import { useGetChats } from "../hooks";

import { CurrentChatContext } from "/src/setup/app-context-manager";
import ChatList from './ChatList'

const ChatsContainer = () => {
  const chats = useGetChats();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  return (
    <div className=" p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div>
        {chats.map((chat, i) => (
          <ChatList chat={chat} setCurrentChat={setCurrentChat} key={chat.sender_name + i}/>
        ))}
      </div>
    </div>
  );
};

export default ChatsContainer;
