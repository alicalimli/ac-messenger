import { useRef, useState, useContext, useEffect, useCallback } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useLocalStorage } from "../Hooks";

import { SignIn, SignUp } from "./";

import { UserContext } from "../Contexts";

const Authentication = ({ userInfo, setUserInfo }) => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [pendingMsg, setPendingMsg] = useState("");
  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  const authenticate = useCallback(async () => {
    try {
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

      setPendingMsg("");
    } catch (error) {
      console.error(error);
      setPendingMsg("");
    }
  });

  useEffect(() => {
    authenticate();
  }, [userToken, setUserToken]);

  return (
    <div className="m-auto mt-8 w-full sm:w-96 p-12 rounded-xl bg-white shadow-lg">
      {pendingMsg && <h1>{pendingMsg}...</h1>}
      <AnimatePresence>
        {isSigningIn ? (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0, x: 100 }}
            initial={{ opacity: 0, x: 100 }}
          >
            {" "}
            <SignIn
              setIsSigningIn={setIsSigningIn}
              setPendingMsg={setPendingMsg}
              setUserToken={setUserToken}
            />
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0, x: 100 }}
            initial={{ opacity: 0, x: 100 }}
          >
            <SignUp
              setIsSigningIn={setIsSigningIn}
              setPendingMsg={setPendingMsg}
              setUserToken={setUserToken}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Authentication;
