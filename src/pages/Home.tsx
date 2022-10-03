import { useState } from "react";

import { Sidebar, SideContent } from "features/sidebar";
import { ChatBox } from "features/conversation";

import { ErrorMsg } from "components";

import { start_messaging_img } from "assets/images/";
import { useAppSelector } from "app/hooks";
import { getChatState } from "features/inbox/chatReducer";

import { AnimatePresence, motion } from "framer-motion";
import { VARIANTS_MANAGER } from "setup/variants-manager";

const Home = () => {
  const defaultSideBarContent = "chats";
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

  const { chatId, recipient } = useAppSelector(getChatState);

  return (
    <div className="absolute inset-0 flex flex-col-reverse md:flex-row w-screen overflow-hidden">
      <Sidebar setSideBarContent={setSideBarContent} />
      <SideContent
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      {chatId ? (
        <motion.div
          variants={VARIANTS_MANAGER}
          initial="slide-from-right"
          animate="slide-in"
          exit="slide-from-right"
          className="h-full w-screen absolute z-10 md:relative md:flex items-center justify-center"
        >
          <ChatBox recipient={recipient} />
        </motion.div>
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
