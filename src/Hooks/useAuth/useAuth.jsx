import { useRef, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks";

const useAuth = () => {
  console.log("Authenticating");

  const [userToken, setUserToken] = useLocalStorage("userToken", "");
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();

  const authenticate = useCallback(async () => {
    try {
      if (!userToken) throw new Error("Token doesn't exist");

      // GETTING USER'S INFO FROM THE API
      const getUserInfo = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });

      const getUserInfoRes = await getUserInfo.json();

      setUser(Object.assign(user, getUserInfoRes.user));

      // Saves data's to local storage
      setUserInfo(Object.assign(userInfo, getUserInfoRes.user));

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  });

  console.log(authenticate);

  return authenticate;
};

export default useAuth;
