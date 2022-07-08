import ReactDOM from "react-dom";
import React, { StrictMode, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { Authentication } from "./Authentication";
import { Home } from "./Containers";

import { UserContextProvider } from "./Contexts";

import { useLocalStorage } from "./Hooks";

const App = () => {
  const [keepSignedIn, setKeepSignedIn] = useState(false)

  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null);
  const [userToken,setUserToken] = useLocalStorage('userToken', '');

  // Clear user data in local storage if keep signed in is false
  window.onbeforeunload = () => {
    if(!keepSignedIn){
      setUserInfo(null)
      setUserToken('')
    }
  }

  return (
    <StrictMode>
      <UserContextProvider>
        <BrowserRouter>
          {userInfo ? (
            <Home userInfo={userInfo} setUserInfo={setUserInfo} />
          ) : (
            <Authentication keepSignedIn={keepSignedIn} setKeepSignedIn={setKeepSignedIn} userInfo={userInfo} setUserInfo={setUserInfo} />
          )}
        </BrowserRouter>
      </UserContextProvider>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
