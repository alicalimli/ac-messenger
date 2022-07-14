import React, { useState, createContext } from "react";

export const UserContext = createContext();
export const UserTokenContext = createContext();
export const ToastMsgContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [toastMsg, setToastMsg] = useState('');

  return (
    <UserContext.Provider value={[user, setUser]}>
      <UserTokenContext.Provider value={[userToken, setUserToken]}>
        <toastMsg value={[toastMsg,setToastMsg]}>
          {children}
        </toastMsg>
      </UserTokenContext.Provider>
    </UserContext.Provider>
  );
};
