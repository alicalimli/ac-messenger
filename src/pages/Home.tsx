import { useState } from "react";

import { Sidebar, SideContent } from "features/sidebar";
import { ChatBox } from "features/conversation";

import { ErrorMsg } from "components";

import { start_messaging_img } from "assets/images/";

const Home = () => {
  const defaultSideBarContent = "chats";
  const [currentChat, setCurrentChat] = useState("");
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar setSideBarContent={setSideBarContent} />
      <SideContent
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      {!currentChat ? (
        <div className="h-screen w-screen absolute z-10 bg-muted-light/10 dark:bg-black duration-300 md:relative md:flex items-center justify-center">
          <ChatBox currentChat={currentChat} setCurrentChat={setCurrentChat} />
        </div>
      ) : (
        <ErrorMsg
          className="hidden md:flex"
          img={start_messaging_img}
          msg="Start Messaging with Chately"
          subMsg="Select a chat in your inbox to start messaging."
        />
      )}
    </div>
  );
};

export default Home;
