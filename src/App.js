import ReactDOM from "react-dom";
import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import { Authentication } from "./Authentication";
import { Home } from "./Containers";

import { UserContextProvider } from "./Contexts";

const App = () => {
  return (
    <StrictMode>
      <UserContextProvider>
        <BrowserRouter>
          <Authentication />
        </BrowserRouter>
      </UserContextProvider>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
