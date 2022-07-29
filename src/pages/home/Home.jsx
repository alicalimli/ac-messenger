import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useContext } from "react";

import { Sidebar, SideContent } from "/src/features/sidebar/components";
import { ChatBox } from "../../features/conversation/components";

import {CurrentChatContext} from '/src/setup/app-context-manager'
import { VARIANTS_MANAGER } from "/src/setup/variants-manager";

const Home = () => {
  const defaultSideBarContent = "chats";
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

  const [currentChat, setCurrentChat] = useContext(CurrentChatContext)

  const previousContentRef = useRef("");

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
        previousContentRef={previousContentRef}
      />
      <SideContent
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
        previousContentRef={previousContentRef}
      />
      { currentChat && (
      <div
        className="h-screen w-screen justify-center hidden md:block bg-muted-light/10 dark:bg-black duration-300"
      >
        <ChatBox currentChat={currentChat} />
      </div>
        ) }
    </div>
  );
};

export default Home;
