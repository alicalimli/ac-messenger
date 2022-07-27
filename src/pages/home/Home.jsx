import React, { useState, useRef } from "react";
import { SidebarNav, Conversation, SidebarContent } from "./components";

const Home = ({ userInfo, setUserInfo }) => {
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
      <Conversation />
    </div>
  );
};

export default Home;
