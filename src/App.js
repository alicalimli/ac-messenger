import ReactDOM from "react-dom";
import React, { StrictMode, useEffect, useState, useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import { Authentication } from "./Authentication";
import { Home } from "./Containers";

import { Toast } from "./Components";

import { UserContextProvider, UserContext, UserTokenContext } from "./Contexts";

import { useLocalStorage } from "./Hooks";

const App = () => {
  const [pendingMsg, setPendingMsg] = useState("");

  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");

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
          <h1>{pendingMsg}...</h1>
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

const Main = () => {
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
};

ReactDOM.render(React.createElement(Main), document.getElementById("root"));
