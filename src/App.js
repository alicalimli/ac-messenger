import ReactDOM from "react-dom";
import React, { StrictMode, useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";

import { Authentication } from "./Authentication";
import { Home } from "./Containers";

import { UserContextProvider } from "./Contexts";

import {useLocalStorage} from './Hooks'

const App = () => {
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', null);

  return (
    <StrictMode>
      <UserContextProvider>
        <BrowserRouter>
          {userInfo ? <Home userInfo={userInfo} setUserInfo={setUserInfo} /> : <Authentication userInfo={userInfo} setUserInfo={setUserInfo} />}
        </BrowserRouter>
      </UserContextProvider>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
