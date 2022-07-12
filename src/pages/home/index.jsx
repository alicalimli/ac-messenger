import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { SidebarNav, Conversation, SidebarContent } from "./components";
import { useLocalStorage } from "/src/common/hooks";

const Home = ({ userInfo, setUserInfo }) => {
  const defaultSideBarContent = "chats";
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

  const previousContentRef = useRef("");

  return (
    <>
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
    </>
  );
};

export default Home;
