import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SidebarNav, Conversation } from "./Components";
import { useLocalStorage } from "../Hooks";

const Home = ({ userInfo, setUserInfo }) => {
  return (
    <>
      <SidebarNav userInfo={userInfo} setUserInfo={setUserInfo} />
      <Conversation />
    </>
  );
};
export default Home;
