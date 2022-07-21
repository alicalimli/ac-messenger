import React, { useState, createContext } from "react";

export const UserRefreshContext = createContext();
export const UserContext = createContext();
export const UserTokenContext = createContext();
export const ToastMsgContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userRefresh, setUserRefresh] = useState("");
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  return (
    <UserContext.Provider value={[user, setUser]}>
      <UserTokenContext.Provider value={[userToken, setUserToken]}>
        <ToastMsgContext.Provider value={[toastMsg, setToastMsg]}>
          <UserRefreshContext.Provider value={{ userRefresh, setUserRefresh }}>
            {children}
          </UserRefreshContext.Provider>
        </ToastMsgContext.Provider>
      </UserTokenContext.Provider>
    </UserContext.Provider>
  );
};
