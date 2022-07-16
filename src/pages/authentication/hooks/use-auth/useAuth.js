import { useRef, useEffect, useState, useContext } from "react";

import {
  UserContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import { useLocalStorage, useGenerateToken } from "/src/common/hooks";
import axios from "/src/api/axios";

const SIGNUP_URL = "/users";
const GETUSER_URL = "/users/me";

const useAuth = (setPendingMsg, setErrorMsg) => {
  const defaultProfileURL = `https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=740`;

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

  const generateToken = useGenerateToken();

  const authenticate = async (userToken) => {
    try {
      setErrorMsg("");

      if (!userToken) return;

      setPendingMsg("Authenticating");

      // GETTING USER'S INFO FROM THE API
      const response = await axios.get(GETUSER_URL, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });

      setUserInfo(response.data.user);
      setPendingMsg("");
    } catch (error) {
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  const signInUser = async (email, pass) => {
    try {
      setErrorMsg("");
      setPendingMsg("generating token");

      const userToken = await generateToken(email, pass);

      setPendingMsg("done");
      setUserToken(userToken);

      authenticate(userToken);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  const signUpUser = async (email, username, password) => {
    try {
      setErrorMsg("");
      setPendingMsg("Creating User");

      const date = new Date();
      const timestamp = date.getTime();

      const userSignUpData = {
        username: username,
        email: email,
        password: password,
        status: true,
        is_active: true,
        profile: defaultProfileURL,
        websocket_id: timestamp.toString(),
      };

      console.log(axios);
      const createUserResponse = await axios.post(
        SIGNUP_URL,
        JSON.stringify(userSignUpData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPendingMsg("User Created");
      signInUser(email, password);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  return { signInUser, signUpUser, authenticate };
};

export default useAuth;
