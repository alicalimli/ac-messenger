import { useRef, useState, useContext, useEffect, useCallback } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useLocalStorage, useAuth } from "../Hooks";

import { SignIn, SignUp } from "./Components";

import { UserContext } from "../Contexts";

const Authentication = ({ setKeepSignedIn, keepSignedIn, setPendingMsg }) => {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  const { authenticate } = useAuth(setPendingMsg);

  useEffect(() => {
    authenticate(userToken);
  }, []);

  return (
    <div className="m-auto mt-8 w-[90%] sm:w-96 p-12 rounded-xl bg-white shadow-lg">
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
              setKeepSignedIn={setKeepSignedIn}
              setPendingMsg={setPendingMsg}
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
