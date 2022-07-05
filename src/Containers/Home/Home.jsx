import React, { useEffect } from "react";

import {useNavigate} from 'react-router-dom'

import { Sidebar, Conversation } from "../../Components";

import { useLocalStorage } from '../../Hooks'

const Home = () => {
  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      navigate("/auth");
    }
  },[]);

  return (
    <>
      <Sidebar />
      <Conversation />
    </>
  );
};
export default Home;
