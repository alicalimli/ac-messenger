import { useRef, useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks";

const useAuth = () => {
  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  if (!userToken) return;

  console.log('Authenticating')

  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();

  const authenticate = useCallback(async () => {
      try {
        // GETTING USER'S INFO FROM THE API
        const getUserInfo = await fetch(
          "http://127.0.0.1:8000/api/v1/users/me",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );

        const getUserInfoRes = await getUserInfo.json();

        setUser(Object.assign(user, getUserInfoRes.user));

        // Saves data's to local storage
        setUserInfo(Object.assign(userInfo, getUserInfoRes.user));

        navigate("/home");
      } catch (error) {
        console.error(error);
        throw error;
      }
  });

  return authenticate;
};

export default useAuth;
