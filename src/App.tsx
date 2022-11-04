import { lazy, StrictMode, Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "hooks";

import { Toast } from "components";
import { useLocalStorage } from "hooks";
import { auth, db } from "setup/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getPendingMsg, getToastMsg } from "toastSlice";
import { login } from "features/authentication";
import { getUserState } from "features/authentication/userSlice";
import { getThemeState } from "features/sidebar/themeSlice";

const Home = lazy(() => import("pages/Home"));
const Authentication = lazy(() => import("pages/Authentication"));

const App = () => {
  const [authUser] = useAuthState(auth);
  const { user: currentUser } = useAppSelector(getUserState);

  const pendingMsg = useAppSelector(getPendingMsg);
  const toastMsg = useAppSelector(getToastMsg);
  const { darkmode } = useAppSelector(getThemeState);

  const dispatch = useAppDispatch();

  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  useEffect(() => {
    if (!authUser) return;

    const userDocRef = doc(db, "users", authUser.uid);

    updateDoc(userDocRef, {
      status: "online",
    });

    const unsub = onSnapshot(userDocRef, async (snapshot) => {
      if (!snapshot.exists()) return;

      dispatch(login(snapshot.data()));
    });

    window.onbeforeunload = () => {
      updateDoc(userDocRef, {
        status: "offline",
      });
      unsub();
    };

    return () => {
      updateDoc(userDocRef, {
        status: "offline",
      });
      unsub();
    };
  }, [authUser]);

  return (
    <StrictMode>
      <BrowserRouter>
        <AnimatePresence>
          {/* Loading Toast */}
          {pendingMsg && <Toast type="loading" msg={pendingMsg} />}

          {/* Notification Toast */}
          {toastMsg && <Toast durationMS={3000} msg={toastMsg} />}
        </AnimatePresence>

        <Suspense fallback={<h1>Loading</h1>}>
          {currentUser.uid ? (
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
            />
          )}
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
