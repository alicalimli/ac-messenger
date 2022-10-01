import { useState } from "react";

import { Sidebar, SideContent } from "features/sidebar";
import { ChatBox } from "features/conversation";

import { ErrorMsg } from "components";

import { start_messaging_img } from "assets/images/";
import { useAppSelector } from "app/hooks";
import { getChatState } from "features/inbox/chatReducer";

const Home = () => {
  const defaultSideBarContent = "chats";
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

  const { chatId, recipient } = useAppSelector(getChatState);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar setSideBarContent={setSideBarContent} />
      <SideContent
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      {chatId ? (
        <div className="h-screen w-screen absolute z-10 bg-muted-light/10 dark:bg-black duration-300 md:relative md:flex items-center justify-center">
          <ChatBox recipient={recipient} />
        </div>
      ) : (
        <ErrorMsg
          className="hidden md:flex"
          img={start_messaging_img}
          msg="Start Messaging with ACMessenger"
          subMsg="Select a chat in your inbox to start messaging."
        />
      )}
    </div>
  );
};

export default Home;
