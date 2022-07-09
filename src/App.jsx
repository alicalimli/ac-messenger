import { StrictMode, useEffect, useState, useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UserContextProvider, UserContext, UserTokenContext } from "./Contexts";

import { Authentication } from "./Authentication";
import { useLocalStorage } from "./Hooks";
import { Home } from "./Containers";
import { Toast } from "./Components";


const Main = () => {
  const [pendingMsg, setPendingMsg] = useState("");

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

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

  return (
    <StrictMode>
      <BrowserRouter>
        <Toast message={pendingMsg}>
          <h1 className="flex items-center gap-4">
            {pendingMsg}...{" "}
            <AiOutlineLoading3Quarters className="animate-spin" />
          </h1>
        </Toast>

        {userInfo ? (
          <Home />
        ) : (
          <Authentication
            keepSignedIn={keepSignedIn}
            setKeepSignedIn={setKeepSignedIn}
            setPendingMsg={setPendingMsg}
          />
        )}
      </BrowserRouter>
    </StrictMode>
  );
};

const App = () => {
  return (
    <UserContextProvider>
      <Main />
    </UserContextProvider>
  );
};

export default App;
