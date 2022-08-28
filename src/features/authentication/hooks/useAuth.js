import { useContext } from "react";

import {
  UserContext,
  UserRefreshContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import axios from "/src/api/axios";
import { useGenerateToken } from "/src/hooks";

const SIGNUP_URL = "/users";
const GETUSER_URL = "/users/me";

const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

const useAuth = (setPendingMsg, setErrorMsg) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const { userRefresh, setUserRefresh } = useContext(UserRefreshContext);

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

      // For bypassing authentication
      if (email === "admin@chately.io" && pass === "admin") {
        // Delay the login for 500ms to show pending msg
        setTimeout(()=>{
          setUserInfo(
            Object.assign(
              {},
              {
                email: "admin@chately.io",
                profile: DEFAULT_PROFILE_IMAGE,
                status: true,
                user_id: 1,
                username: "admin_chately",
                location: "Fatsa",
                bio: "A developer"
              }
            )
          );
          setPendingMsg("");
        }, 500)
        return;
      }

      const userToken = await generateToken(email, pass);

      setPendingMsg("done");

      setUserToken(userToken.access_token);
      setUserRefresh(userToken.refresh_token);

      authenticate(userToken.access_token);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  const signUpUser = async (email, username, password) => {
    try {
      setErrorMsg("");
      setPendingMsg("Creating User");

      const date = new Date();
      const timestamp = date.getTime();

      const userSignUpData = {
        username: username,
        email: email,
        password: password,
        status: true,
        is_active: true,
        profile: DEFAULT_PROFILE_IMAGE,
        websocket_id: timestamp.toString(),
      };

      console.log(axios);
      const createUserResponse = await axios.post(
        SIGNUP_URL,
        JSON.stringify(userSignUpData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPendingMsg("User Created");
      signInUser(email, password);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  return { signInUser, signUpUser, authenticate };
};

export default useAuth;
