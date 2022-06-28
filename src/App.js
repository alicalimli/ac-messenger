import ReactDOM from "react-dom";
import React from "react";

import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import ChatBox from "./ChatBox/ChatBox.jsx";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chatbox" element={<ChatBox />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
