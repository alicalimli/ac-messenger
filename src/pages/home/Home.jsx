import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useContext } from "react";

import { Sidebar, SideContent } from "/src/features/sidebar/components";
import { ChatBox } from "../../features/conversation/components";

import { CurrentChatContext } from "/src/setup/app-context-manager";
import { VARIANTS_MANAGER } from "/src/setup/variants-manager";

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
        <motion.div
          className="hidden md:flex flex-col gap-4 items-center justify-center w-screen p-4"
          variants={VARIANTS_MANAGER}
          initial="pop-out"
          animate="pop-in"
          exit="pop-out"
        >
          <img src={start_messaging_img} className="w-full md:w-96" />
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-black dark:text-white text-2xl max-w-md ">
              Start messaging with Chately.
            </h1>
            <p className="text-muted-light dark:text-muted-dark text-sm ">
              Select a chat in your inbox to start messaging.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
