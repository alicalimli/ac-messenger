import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Sidebar, Conversation } from "../../Components";

import { useLocalStorage } from "../../Hooks";

const Home = () => {
  return (
    <>
      <Sidebar />
      <Conversation />
    </>
  );
};
export default Home;
