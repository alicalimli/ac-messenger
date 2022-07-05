import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Sidebar, Conversation } from "../../Components";

import { useLocalStorage, useAuth } from "../../Hooks";

const Home = () => {
  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  const navigate = useNavigate();
  const authenticate = useAuth();

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <>
      <Sidebar />
      <Conversation />
    </>
  );
};
export default Home;
