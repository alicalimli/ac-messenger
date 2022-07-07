import { useRef, useState, useContext, useEffect, useCallback } from "react";

import { useLocalStorage } from "../Hooks";

import { Login, SignUp } from "./";

const Authentication = () => {
	const [isSigningIn, setIsSigningIn] = useState(true);
	const [userToken, setUserToken] = useLocalStorage("userToken", "");
	const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});

	const authenticate = useCallback(async () => {
		try {
			if (!userToken) return;

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
		} catch (error) {
			console.error(error);
		}
	});

	useEffect(()=>{
		authenticate();
	}, [userToken])

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
