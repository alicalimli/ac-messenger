import ReactDOM from "react-dom";
import React from "react";

import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Conversation from "./Conversation";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Conversation />
      </BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
