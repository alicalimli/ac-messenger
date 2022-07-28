import React from "react";

import { useState, useRef } from "react";
import { SidebarNav, SidebarContent } from "./components";
import { ChatBox } from "../../features/conversation/components";

const Home = () => {
  const defaultSideBarContent = "chats";
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

  const previousContentRef = useRef("");

  return (
    <div className="flex w-full min-h-screen">
      <SidebarNav
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
        previousContentRef={previousContentRef}
      />
      <SidebarContent
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
        previousContentRef={previousContentRef}
      />
      <ChatBox />
    </div>
  );
};

export default Home;
