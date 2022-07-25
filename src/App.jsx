import { StrictMode, useEffect, useState, useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  AppContextProvider,
  UserContext,
  UserTokenContext,
  ToastMsgContext,
  DarkmodeContext,
} from "./setup/app-context-manager";

import { Authentication } from "./pages/authentication";

import { useLocalStorage } from "./common/hooks";
import { Toast } from "./common/components";

import { Home } from "./pages/home";

import { motion, AnimatePresence } from "framer-motion";

const Main = () => {
  const [pendingMsg, setPendingMsg] = useState("");

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [toastMsg, setToastMsg] = useContext(ToastMsgContext);
  const [darkmode, setDarkmode] = useContext(DarkmodeContext);

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  // Saves and clears userData when user leaves the site.
  window.onbeforeunload = () => {
    if (keepSignedIn) {
      setSavedUserToken(userToken);
      setSavedUserInfo(userInfo);
    } else {
      setSavedUserToken("");
      setSavedUserInfo(null);
    }
  };

  useEffect(() => {
    if (keepSignedIn) {
      setUserToken(savedUserToken);
      setUserInfo(savedUserInfo);
    }
  }, []);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <StrictMode>
      <BrowserRouter>
        {/* Loading Toast */}
        <Toast>
          {pendingMsg && (
            <h1 className="flex items-center gap-4">
              {pendingMsg}...{" "}
              <AiOutlineLoading3Quarters className="animate-spin" />
            </h1>
          )}
        </Toast>

        {/* Notification Toast */}
        <Toast durationMs="3000" msg={toastMsg} setMsg={setToastMsg} />

        {userInfo ? (
          <motion.div
            className="flex"
            animate={{ opacity: 1, x: 0, y: 0 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <Home />
          </motion.div>
        ) : (
          <Authentication
            keepSignedIn={keepSignedIn}
            setKeepSignedIn={setKeepSignedIn}
            setPendingMsg={setPendingMsg}
            pendingMsg={pendingMsg}
          />
        )}
      </BrowserRouter>
    </StrictMode>
  );
};

const App = () => {
  return (
    <AppContextProvider>
      <Main />
    </AppContextProvider>
  );
};

export default App;
