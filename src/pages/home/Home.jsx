import React from "react";

import { useState, useRef } from "react";
import { Sidebar, SideContent } from "/src/features/sidebar/components";
import { ChatBox } from "../../features/conversation/components";

const Home = () => {
  const defaultSideBarContent = "chats";
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

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
      <ChatBox />
    </div>
  );
};

export default Home;
