import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useContext } from "react";

import { Sidebar, SideContent } from "/src/features/sidebar/components";
import { ChatBox } from "../../features/conversation/components";

import { CurrentChatContext } from "/src/setup/app-context-manager";
import { VARIANTS_MANAGER } from "/src/setup/variants-manager";

import { ErrorMsg } from '/src/components'

import { start_messaging_img } from "/src/assets/images/";

const Home = () => {
  const defaultSideBarContent = "chats";
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      <SideContent
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      {currentChat ? (
        <div className="h-screen w-screen justify-center absolute z-10 bg-muted-light/10 dark:bg-black duration-300 md:relative md:flex items-center justify-center">
          <ChatBox currentChat={currentChat} setCurrentChat={setCurrentChat} />
        </div>
      ) : (
        <ErrorMsg addClass="hidden md:flex" img={start_messaging_img} msg="Start Messaging with Chately" subMsg="Select a chat in your inbox to start messaging." />
      )}
    </div>
  );
};

export default Home;
