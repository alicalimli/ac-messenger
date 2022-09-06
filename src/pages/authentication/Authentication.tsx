import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SignIn, SignUp } from "../../features/authentication/components";
import { VARIANTS_MANAGER } from "../../setup/variants-manager";

interface AuthenticationProps {
  setKeepSignedIn: any;
  keepSignedIn: Boolean;
  setPendingMsg: any;
  pendingMsg: String;
}

const Authentication = ({
  setKeepSignedIn,
  keepSignedIn,
  setPendingMsg,
  pendingMsg,
}: AuthenticationProps) => {
  const [isSigningIn, setIsSigningIn] = useState(true);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[90%] sm:w-[25rem] h-[700px] relative overflow-x-hidden flex items-center justify-center">
        <AnimatePresence>
          {isSigningIn && (
            <motion.div
              key="signin-form"
              className="absolute w-[90%] sm:w-96 "
              variants={VARIANTS_MANAGER}
              initial="slide-from-left"
              animate="slide-in"
              exit="slide-from-left"
            >
              {" "}
              <SignIn
                setKeepSignedIn={setKeepSignedIn}
                setIsSigningIn={setIsSigningIn}
                setPendingMsg={setPendingMsg}
                keepSignedIn={keepSignedIn}
                pendingMsg={pendingMsg}
              />
            </motion.div>
          )}
          {!isSigningIn && (
            <motion.div
              key="signup-form"
              className="absolute w-[90%] sm:w-96"
              variants={VARIANTS_MANAGER}
              initial="slide-from-right"
              animate="slide-in"
              exit="slide-from-right"
            >
              <SignUp
                setPendingMsg={setPendingMsg}
                setIsSigningIn={setIsSigningIn}
                pendingMsg={pendingMsg}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Authentication;
