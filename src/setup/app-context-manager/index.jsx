import React, { createContext, useState } from "react";

import { useLocalStorage } from "/src/hooks";

export const UserRefreshContext = createContext();
export const UserTokenContext = createContext();
export const DarkmodeContext = createContext();
export const ToastMsgContext = createContext();
export const CurrentChatContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userRefresh, setUserRefresh] = useState("");
  const [userToken, setUserToken] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <UserTokenContext.Provider value={[userToken, setUserToken]}>
      <ToastMsgContext.Provider value={[toastMsg, setToastMsg]}>
        <UserRefreshContext.Provider value={{ userRefresh, setUserRefresh }}>
          <CurrentChatContext.Provider value={[currentChat, setCurrentChat]}>
            {children}
          </CurrentChatContext.Provider>
        </UserRefreshContext.Provider>
      </ToastMsgContext.Provider>
    </UserTokenContext.Provider>
  );
};
