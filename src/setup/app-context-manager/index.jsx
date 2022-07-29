import React, { createContext, useState } from "react";

import { useLocalStorage } from "/src/hooks";

export const UserRefreshContext = createContext();
export const UserContext = createContext();
export const UserTokenContext = createContext();
export const DarkmodeContext = createContext();
export const ToastMsgContext = createContext();
export const CurrentChatContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userRefresh, setUserRefresh] = useState("");
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [currentChat, setCurrentChat] = useState(null);

  const [darkmode, setDarkmode] = useLocalStorage("darkmode", false);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <UserTokenContext.Provider value={[userToken, setUserToken]}>
        <ToastMsgContext.Provider value={[toastMsg, setToastMsg]}>
          <UserRefreshContext.Provider value={{ userRefresh, setUserRefresh }}>
            <DarkmodeContext.Provider value={[darkmode, setDarkmode]}>
              <CurrentChatContext.Provider
                value={[currentChat, setCurrentChat]}
              >
                {children}
              </CurrentChatContext.Provider>
            </DarkmodeContext.Provider>
          </UserRefreshContext.Provider>
        </ToastMsgContext.Provider>
      </UserTokenContext.Provider>
    </UserContext.Provider>
  );
};
