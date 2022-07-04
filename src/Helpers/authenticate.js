import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks";

const authenticate = async () => {
	try {
		const [userToken, setUserToken] = useLocalStorage("userToken", "");
		const [userInfo, setUserInfo] = useLocalStorage("userInfo", {})
		const [user, setUser] = useContext(UserContext);

 		const navigate = useNavigate();

		let loginFormData = new FormData();
		loginFormData.append("username", userEmailRef.current.value);
		loginFormData.append("password", userPassRef.current.value);

		const loginUser = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
			method: "POST",
			body: loginFormData,
		});

		const loginResults = await loginUser.json();

		if (!loginResults.access_token)
			throw new Error("Incorrect email or password");

		// GETTING USER'S INFO FROM THE API

		const userInfo = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + loginResults.access_token,
			},
		});

		const userInfoRes = await userInfo.json();

		setUser(Object.assign(user, userInfoRes.user));
		setUserToken(loginResults.access_token);
		navigate("/home");
	} catch (error) {
		throw error;
		console.error(error)
	}
};

export default authenticate;
