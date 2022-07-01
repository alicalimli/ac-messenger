import React from "react";
import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({
		userName: "",
		userPassword: "",
		userEmail: "",
	});

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	);
};