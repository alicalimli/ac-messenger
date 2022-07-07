import { useRef, useState, useContext, useEffect, useCallback } from "react";

import { useLocalStorage } from "../Hooks";

import { Login, SignUp } from "./";

import { UserContext } from "../Contexts";

const Authentication = ({ userInfo, setUserInfo }) => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  const authenticate = useCallback(async () => {
    try {
      if (!userToken) return;

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
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    authenticate();
  }, [userToken, setUserToken]);

  return (
    <div>
      {isSigningIn ? (
        <Login setIsSigningIn={setIsSigningIn} setUserToken={setUserToken} />
      ) : (
        <SignUp setIsSigningIn={setIsSigningIn} setUserToken={setUserToken} />
      )}
    </div>
  );
};

export default Authentication;
