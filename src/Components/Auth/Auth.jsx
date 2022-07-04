import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../Contexts";

import { useLocalStorage } from "../../Hooks";

const Auth = async (email, password) => {
	const [userToken, setUserToken] = useLocalStorage("userToken", "");
	const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});
	const [user, setUser] = useContext(UserContext);

	const navigate = useNavigate();

	const authenticate = () => {
		try {
			let loginFormData = new FormData();
			loginFormData.append("username", email);
			loginFormData.append("password", password);

			const loginUser = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
				method: "POST",
				body: loginFormData,
			});

			const loginResults = await loginUser.json();

			if (!loginResults.access_token)
				throw new Error("Incorrect email or password");

			// GETTING USER'S INFO FROM THE API

			const getUserInfo = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + loginResults.access_token,
				},
			});

			const getUserInfoRes = await getUserInfo.json();

			setUser(Object.assign(user, getUserInfoRes.user));
			setUserToken(loginResults.access_token);
			navigate("/home");
		} catch (error) {
			throw error;
			console.error(error);
		}
	}

	return <div>Signing in</div>;
};

export default Auth;
