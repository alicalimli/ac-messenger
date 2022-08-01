import axios from "/src/api/axios";
import { useContext } from "react";
import {
  UserRefreshContext,
  UserContext,
} from "/src/setup/app-context-manager";

const REFRESH_TOKEN_URL = "/auth/refresh";

const useRefreshToken = () => {
  const { userRefresh, setUserRefresh } = useContext(UserRefreshContext);
  const [userInfo, setUserInfo] = useContext(UserContext);

  const refreshToken = async (email, password) => {
    try {
      // Request login from the API
      const response = await axios.post(REFRESH_TOKEN_URL + userRefresh);

      console.log(response);
      console.log("asdfasd");

      return response.data;
    } catch (error) {
      console.log("expired");
      throw new Error(error.response.data.detail);
    }
  };

  return refreshToken;
};

export default useRefreshToken;
