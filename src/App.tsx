import { StrictMode, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { Authentication, Home } from "pages";
import { Toast } from "components";
import { useLocalStorage } from "hooks";
import { auth, db } from "services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getPendingMsg, getToastMsg } from "toastSlice";
import { login } from "features/authentication";

const App = () => {
  const [user] = useAuthState(auth);

  const pendingMsg = useAppSelector(getPendingMsg);
  const toastMsg = useAppSelector(getToastMsg);
  const darkmode = useAppSelector((state: any) => state.theme.value.darkmode);

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
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userDocRef = doc(db, "users", user.uid);
      const userDocData = (await getDoc(userDocRef)).data();

      if (!userDocData) {
        setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          bio: "A Bio.",
          status: "off",
          location: "Earth",
          photoURL: user.photoURL,
        });
      } else {
        dispatch(login(userDocData));
      }
    });

    return unsub;
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <AnimatePresence>
          {/* Loading Toast */}
          {pendingMsg && <Toast type="loading" msg={pendingMsg} />}

          {/* Notification Toast */}
          {toastMsg && <Toast durationMS={3000} msg={toastMsg} />}
        </AnimatePresence>

        {user ? (
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
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
