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

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);

  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  // Clear user data in local storage if keep signed in is false
  window.onbeforeunload = () => {
    if (!keepSignedIn) {
      setUserInfo(null);
      setUserToken("");
    }
  };

  return (
    <StrictMode>
      <BrowserRouter>
        {userInfo ? (
          <Home userInfo={userInfo} setUserInfo={setUserInfo} />
        ) : (
          <Authentication
            keepSignedIn={keepSignedIn}
            setKeepSignedIn={setKeepSignedIn}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
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
