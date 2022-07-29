import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useContext } from "react";

import { Sidebar, SideContent } from "/src/features/sidebar/components";
import { ChatBox } from "../../features/conversation/components";

import {CurrentChatContext} from '/src/setup/app-context-manager'
import { VARIANTS_MANAGER } from "/src/setup/variants-manager";

import {start_messaging_img} from '/src/assets/images/'

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
      <div
        className="h-screen w-screen justify-center hidden bg-muted-light/10 dark:bg-black duration-300 md:flex items-center justify-center"
      >
        { currentChat ? (
          <ChatBox currentChat={currentChat} />
          ) :
        <motion.div
        className="flex flex-col gap-4 items-center justify-center"
            variants={VARIANTS_MANAGER}
            initial="pop-out"
            animate="pop-in"
            exit="pop-out"
        >
              <img src={start_messaging_img} className="w-full md:w-96" />
              <h1 className="text-black dark:text-white text-2xl max-w-md text-center">Select a chat in your inbox to start messaging.</h1>
        </motion.div>
      }
      </div>
    </div>
  );
};

export default Home;
