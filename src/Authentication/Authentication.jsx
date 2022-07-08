import { useRef, useState, useContext, useEffect, useCallback } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useLocalStorage } from "../Hooks";

import {Toast} from '../Components'

import { SignIn, SignUp } from "./";

import { UserContext } from "../Contexts";

const Authentication = ({
  userInfo,
  setUserInfo,
  setKeepSignedIn,
  keepSignedIn,
}) => {
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
    <div className="m-auto mt-8 w-[90%] sm:w-96 p-12 rounded-xl bg-white shadow-lg">
      {pendingMsg && (<Toast><h1>{pendingMsg}...</h1></Toast>)}
      <AnimatePresence>
        {isSigningIn && (
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
          >
            {" "}
            <SignIn
              setIsSigningIn={setIsSigningIn}
              setPendingMsg={setPendingMsg}
              setUserToken={setUserToken}
              setKeepSignedIn={setKeepSignedIn}
              keepSignedIn={keepSignedIn}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isSigningIn && (
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
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
