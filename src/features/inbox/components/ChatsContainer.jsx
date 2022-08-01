import { useContext } from "react";
import { TwTrnButton } from "/src/components";
import { useGetChats } from "../hooks";

import { CurrentChatContext } from "/src/setup/app-context-manager";

const ChatsContainer = () => {
  const chats = useGetChats();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  const chatClickHandler = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className=" p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div>
        {chats.map((chat, i) => (
          <TwTrnButton
            clickHandler={() => chatClickHandler(chat)}
            addClass="w-full p-2"
            key={chat.sender_name + i}
          >
            <div className="relative bg-transparent h-16 w-16">
              <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
              <img src={chat.profile} className="w-full rounded-full" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl text-black dark:text-white">
                {chat.sender_name}
              </h2>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                {chat.last_message}
              </p>
            </div>
          </TwTrnButton>
        ))}
      </div>
    </div>
  );
};

export default ChatsContainer;
