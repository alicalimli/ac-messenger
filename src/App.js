import ReactDOM from "react-dom";
import React, { StrictMode, useEffect, useState, useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import { Authentication } from "./Authentication";
import { Home } from "./Containers";

import { UserContextProvider, UserContext } from "./Contexts";

import { useLocalStorage } from "./Hooks";

const App = () => {
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [savedUserInfo, setSavedUserInfo] = useLocalStorage('userInfo', null)

  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  // Saves and clears userData when user leaves the site.
  window.onbeforeunload = () => {
    if (keepSignedIn) {
      setUserToken(userToken);
      setSavedUserInfo(userInfo)
    } else {
      setUserToken("");
      setSavedUserInfo(null)
    }
  };

  return (
    <StrictMode>
      <BrowserRouter>
        {userInfo ? (
          <Home />
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

const Main = () => {
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
};

ReactDOM.render(React.createElement(Main), document.getElementById("root"));
