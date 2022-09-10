import { useContext } from "react";
import { useDispatch } from "react-redux";
import { login } from "./user";

import { UsersData } from "/src/localdatas";

import {
  UserRefreshContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import axios from "/src/api/axios";
import { useGenerateToken } from "/src/hooks";

const SIGNUP_URL = "/users";
const GETUSER_URL = "/users/me";

const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

const useAuth = (setPendingMsg, setErrorMsg) => {
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const { userRefresh, setUserRefresh } = useContext(UserRefreshContext);
  const dispatch = useDispatch();

  const generateToken = useGenerateToken();

  const authenticate = async (userToken) => {
    try {
      setErrorMsg("");

      if (!userToken) return;

      setPendingMsg("Authenticating");

      // GETTING USER'S INFO FROM THE API
      const response = await axios.get(GETUSER_URL, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });

      setUserInfo(response.data.user);
      setPendingMsg("");
    } catch (error) {
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  const signInUser = async (email, pass) => {
    try {
      setErrorMsg("");
      setPendingMsg("generating token");

      console.log(UsersData);

      const UserData = UsersData.find(
        (user) => user.email === email && user.password === pass
      );

      if (!UserData)
        throw new Error(
          "Authentication Failed, username or password you have entered is incorrect."
        );

      // For bypassing authentication
      // Delay the login for 500ms to show pending msg
      setTimeout(() => {
        dispatch(login(UserData));
        setPendingMsg("");
      }, 500);

      // Bypassing ends here

      // const userToken = await generateToken(email, pass);

      // setPendingMsg("done");

      // setUserToken(userToken.access_token);
      // setUserRefresh(userToken.refresh_token);

      // authenticate(userToken.access_token);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  const signUpUser = async (email, username, password) => {
    try {
      setErrorMsg("");

      throw new Error("Creating user is not available");
      // setPendingMsg("Creating User");

      // const date = new Date();
      // const timestamp = date.getTime();

      // const userSignUpData = {
      //   username: username,
      //   email: email,
      //   password: password,
      //   status: true,
      //   is_active: true,
      //   profile: DEFAULT_PROFILE_IMAGE,
      //   websocket_id: timestamp.toString(),
      // };

      // console.log(axios);
      // const createUserResponse = await axios.post(
      //   SIGNUP_URL,
      //   JSON.stringify(userSignUpData),
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // setPendingMsg("User Created");
      // signInUser(email, password);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  return { signInUser, signUpUser, authenticate };
};

export default useAuth;
