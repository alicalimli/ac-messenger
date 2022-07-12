import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SidebarNav, Conversation, SidebarContent } from "./Components";
import { useLocalStorage } from "../common/hooks";

const Home = ({ userInfo, setUserInfo }) => {
  const defaultSideBarContent = 'chats'
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);
  return (
    <>
      <SidebarNav
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      <SidebarContent
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      <Conversation />
    </>
  );
};
export default Home;
