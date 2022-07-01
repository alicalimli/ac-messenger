import ReactDOM from "react-dom";
import React from "react";

import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import Home from "./Home/Home.jsx";

import {UserContextProvider} from './UserContextProvider/UserContextProvider.jsx'

const App = () => {
  return (
    <StrictMode>
      <UserContextProvider >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
