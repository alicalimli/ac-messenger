import { useRef, useEffect, useState, useContext } from "react";

import { useGenerateToken, useLocalStorage } from "../";

import { UserContext, UserTokenContext } from "../../Contexts";

const useAuth = (setPendingMsg, setErrorMsg) => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  const [userToken, setUserToken] = useContext(UserTokenContext);

  const generateToken = useGenerateToken();

  const authenticate = async (userToken) => {
    try {
      setErrorMsg('');

      if (!userToken) return;

      setPendingMsg("Authenticating");

      // GETTING USER'S INFO FROM THE API
      const getUserInfo = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });

      const getUserInfoRes = await getUserInfo.json();

      // Saves data's to local storage
      setUserInfo(getUserInfoRes.user);
      console.log(getUserInfoRes.user);

      setPendingMsg("");
    } catch (error) {
      setErrorMsg(error.message)
      setPendingMsg('');
    }
  };

  const makeLogin = async (email, pass) => {
    try {
      setErrorMsg('');

      console.log("generateToken");
      setPendingMsg("generating token");

      const userToken = await generateToken(email, pass);

      console.log(userToken);
      setPendingMsg("done");

      setUserToken(userToken);
      authenticate(userToken);
    } catch (error) {
      setErrorMsg(error.message)
      setPendingMsg('');
    }
  };

  const createUser = async (email, username, password) => {
    try {
      setErrorMsg('');

      setPendingMsg("Creating User");

      const date = new Date();
      const timestamp = date.getTime();

      const userSignUpData = {
        username: username,
        email: email,
        password: password,
        status: true,
        is_active: true,
        profile: "default.png",
        websocket_id: timestamp.toString(),
      };

      const createUser = await fetch("http://127.0.0.1:8000/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSignUpData),
      });

      setPendingMsg("User Created");

      const createUserRes = await createUser.json();

      if (!createUserRes.id) throw new Error(createUserRes.detail[0].msg);

      setPendingMsg("Signing In");

      const userToken = await makeLogin(email, password);

      return userToken;
    } catch (error) {
      setErrorMsg(error.message)
      setPendingMsg('');
    }
  };

  return { makeLogin, createUser, authenticate };
};

export default useAuth;
