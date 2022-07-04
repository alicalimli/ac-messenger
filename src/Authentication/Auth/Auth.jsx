import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks";

const Auth = ({ email, password, setIsAuthenticating, setErrorMsg}) => {
  const [userToken, setUserToken] = useLocalStorage("userToken", "");
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});
  const [user, setUser] = useContext (UserContext);

  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      let loginFormData = new FormData();
      loginFormData.append("username", email);
      loginFormData.append("password", password);

      // Request login from the API
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

      // Saves data's to local storage
      setUserInfo(Object.assign(userInfo, getUserInfoRes.user))
      setUserToken(loginResults.access_token);

      navigate("/home");
    } catch (error) {
      setIsAuthenticating(false);
      setErrorMsg(error.message)

      console.error(error);
      const errorTimeout = setTimeout(() => setErrorMsg(null), 5000);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return <div>Signing in</div>;
};

export default Auth;
