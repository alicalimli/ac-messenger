import { StrictMode, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  AppContextProvider,
  DarkmodeContext,
  ToastMsgContext,
  UserContext,
  UserTokenContext,
} from "./setup/app-context-manager";

import { Authentication } from "./pages";
import { Home } from "./pages";
import { Toast } from "./components";
import { useLocalStorage } from "./hooks";

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
        <AnimatePresence>
          {/* Loading Toast */}
          {pendingMsg && <Toast msg={pendingMsg} />}

          {/* Notification Toast */}
          {toastMsg && (
            <Toast msg={toastMsg} durationMS={3000} setMsg={setToastMsg} />
          )}
        </AnimatePresence>

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
