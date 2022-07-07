import React from "react";

import { useRef, useState, useContext, useEffect, useCallback } from "react";

import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks";

import { Login, SignUp } from "./";

const Authentication = () => {
	const [isSigningIn, setIsSigningIn] = useState(true);
	const [userToken, setUserToken] = useLocalStorage("userToken", "");
	const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});
	const [user, setUser] = useContext(UserContext);

	const navigate = useNavigate();

	const authenticate = useCallback(async () => {
		try {
			if (!userToken) navigate("/login");

			// GETTING USER'S INFO FROM THE API
			const getUserInfo = await fetch("http://127.0.0.1:8000/api/v1/users/me", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + userToken,
				},
			});

			const getUserInfoRes = await getUserInfo.json();

			setUser(Object.assign(user, getUserInfoRes.user));

			console.log("fetching data", userToken);

			// Saves data's to local storage
			setUserInfo(Object.assign(userInfo, getUserInfoRes.user));

			navigate("/home");
		} catch (error) {
			console.error(error);
		}
	});

	return (
		<div>
			{isSigningIn ? (
				<Login setIsSigningIn={setIsSigningIn} />
			) : (
				<SignUp setIsSigningIn={setIsSigningIn} />
			)}
		</div>
	);
};

export default Authentication;
