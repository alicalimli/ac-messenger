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

  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  // Saves and clears userData when user leaves the site.
  window.onbeforeunload = () => {
    if (keepSignedIn) {
      setUserToken(userToken);
    } else {
      setUserToken("");
    }
  };

  useEffect(() => {
    if (user) {
      setUserInfo(savedUserInfo);
    }
  }, []);

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
