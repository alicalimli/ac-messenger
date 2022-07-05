import ReactDOM from "react-dom";
import React, { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login, SignUp } from "./Authentication";
import { Home } from "./Containers";

import { UserContextProvider } from "./Contexts";

const App = () => {
  return (
    <StrictMode>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
