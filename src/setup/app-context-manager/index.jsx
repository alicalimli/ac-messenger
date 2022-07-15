import React, { useState, createContext } from "react";

export const AuthContext = createContext();
export const UserContext = createContext();
export const UserTokenContext = createContext();
export const ToastMsgContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [auth,setAuth] = useState(false)
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [toastMsg, setToastMsg] = useState('');

  return (
    <UserContext.Provider value={[user, setUser]}>
      <UserTokenContext.Provider value={[userToken, setUserToken]}>
        <ToastMsgContext.Provider value={[toastMsg,setToastMsg]}>
           <AuthContext.Provider value={{auth,setAuth}}>
            {children}
          </AuthContext.Provider>
        </ToastMsgContext.Provider>
      </UserTokenContext.Provider>
    </UserContext.Provider>
  );
};
