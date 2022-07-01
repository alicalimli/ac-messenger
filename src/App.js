import ReactDOM from "react-dom";
import React from "react";

import { StrictMode, useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import ChatBox from "./ChatBox/ChatBox.jsx";
import Sidebar from './Sidebar/Sidebar.jsx'

export const UserContext = createContext()

const App = () => {
  const [user,setUser] = useState({
    'userName': "",
    'userPass': "",
    'userEmail': "",
  })

  return (
    <StrictMode>
      <UserContext.Provider value={[user,setUser]}>
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chatbox" element={<ChatBox />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </StrictMode>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
