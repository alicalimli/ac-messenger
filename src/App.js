import ReactDOM from "react-dom";
import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import { Authentication } from "./Authentication";
import { Home } from "./Containers";

import { UserContextProvider } from "./Contexts";

import {useLocalStorage} from './Hooks'

const App = () => {
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});
  console.log(userInfo)
  return (
    <StrictMode>
      <UserContextProvider>
        <BrowserRouter>
          {userInfo ? <Home /> : <Authentication />}
        </BrowserRouter>
      </UserContextProvider>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
