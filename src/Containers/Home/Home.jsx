import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Sidebar, Conversation } from "../../Components";

import { useLocalStorage } from "../../Hooks";

const Home = ({userInfo, setUserInfo}) => {
  return (
    <>
      <Sidebar userInfo={userInfo} setUserInfo={setUserInfo}/>
      <Conversation />
    </>
  );
};
export default Home;
