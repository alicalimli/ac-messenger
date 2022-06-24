import ReactDOM from "react-dom";
import React from "react";

import { StrictMode, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <h1>Hello World</h1>
      </BrowserRouter>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
