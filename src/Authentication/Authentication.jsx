import { useRef, useState, useContext, useEffect, useCallback } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useLocalStorage, useAuth } from "../Hooks";

import { SignIn, SignUp } from "./Components";

import { UserContext } from "../Contexts";

const Authentication = ({ setKeepSignedIn, keepSignedIn, setPendingMsg }) => {
  const [isSigningIn, setIsSigningIn] = useState(true);

  return (
    <div className="w-[90%] sm:w-[25rem] h-[600px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {isSigningIn && (
          <motion.div
            className="absolute w-[90%] sm:w-96"
            animate={{ opacity: 1, x: "0"}}
            initial={{ opacity: 0, x: "-150%"}}
            exit={{ opacity: 0, x: "-150%"}}
          >
            {" "}
            <SignIn
              setKeepSignedIn={setKeepSignedIn}
              setIsSigningIn={setIsSigningIn}
              setPendingMsg={setPendingMsg}
              keepSignedIn={keepSignedIn}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isSigningIn && (
          <motion.div
            className="absolute w-[90%] sm:w-96"
            animate={{ opacity: 1, x: "0"}}
            initial={{ opacity: 0, x: "150%"}}
            exit={{ opacity: 0, x: "150%"}}
          >
            <SignUp
              setPendingMsg={setPendingMsg}
              setIsSigningIn={setIsSigningIn}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Authentication;
