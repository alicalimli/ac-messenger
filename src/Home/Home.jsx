import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SidebarNav, Conversation, SidebarContent } from "./Components";
import { useLocalStorage } from "../Hooks";

const Home = ({ userInfo, setUserInfo }) => {
  return (
    <>
      <SidebarNav userInfo={userInfo} setUserInfo={setUserInfo} />
      <SidebarContent />
      <Conversation />
    </>
  );
};
export default Home;
