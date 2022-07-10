import { useRef, useState, useContext, useEffect, useCallback } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useLocalStorage, useAuth } from "../Hooks";

import { SignIn, SignUp } from "./Components";

import { UserContext } from "../Contexts";

const Authentication = ({ setKeepSignedIn, keepSignedIn, setPendingMsg }) => {
  const [isSigningIn, setIsSigningIn] = useState(true);

  return (
    <div className="">
      <AnimatePresence>
        {isSigningIn && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            animate={{ opacity: 1, x:"-50%", y:"-50%"  }}
            initial={{ opacity: 0, x:"-150%", y:"-50%"  }}
            exit={{ opacity: 0, x:"-150%", y:"-50%"  }}
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
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            animate={{ opacity: 1, x:"-50%", y:"-50%"  }}
            initial={{ opacity: 0, x:"0", y:"-50%"  }}
            exit={{ opacity: 0, x:"0%", y:"-50%"  }}
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
