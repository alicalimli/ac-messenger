import { StrictMode, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

import {
  DarkmodeContext,
  ToastMsgContext,
  UserTokenContext,
} from "./setup/app-context-manager";

import { Authentication } from "./pages";
import { Home } from "./pages";
import { Toast } from "./components";
import { useLocalStorage } from "./hooks";

const App = () => {
  const [pendingMsg, setPendingMsg] = useState("");

  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [toastMsg, setToastMsg] = useContext(ToastMsgContext);
  const [darkmode, setDarkmode] = useContext(DarkmodeContext);

  const user = useSelector((state: any) => state.user.value);

  // const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  // const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  // Saves and clears userData when user leaves the site.
  // window.onbeforeunload = () => {
  //   if (keepSignedIn) {
  //     setSavedUserToken(userToken);
  //     setSavedUserInfo(userInfo);
  //   } else {
  //     setSavedUserToken("");
  //     setSavedUserInfo(null);
  //   }
  // };

  // useEffect(() => {
  //   if (keepSignedIn) {
  //     setUserToken(savedUserToken);
  //     setUserInfo(savedUserInfo);
  //   }
  // }, []);

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
          {pendingMsg && <Toast type="loading" msg={pendingMsg} />}

          {/* Notification Toast */}
          {toastMsg && (
            <Toast msg={toastMsg} durationMS={3000} setMsg={setToastMsg} />
          )}
        </AnimatePresence>

        {user.username ? (
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

export default App;
