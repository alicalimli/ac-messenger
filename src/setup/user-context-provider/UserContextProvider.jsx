import React, { useState, createContext } from "react";

export const UserContext = createContext();
export const UserTokenContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");

  return (
    <UserContext.Provider value={[user, setUser]}>
      <UserTokenContext.Provider value={[userToken, setUserToken]}>
        {children}
      </UserTokenContext.Provider>
    </UserContext.Provider>
  );
};
