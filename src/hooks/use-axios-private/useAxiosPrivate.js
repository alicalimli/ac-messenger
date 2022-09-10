import { useEffect, useContext } from "react";

import { axiosPrivate } from "/src/api/axios";
import { UserTokenContext } from "/src/setup/app-context-manager";
import { useSelector } from "react-redux";

import { useRefreshToken } from "/src/hooks";

const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken();
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${userToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        const email = error?.config?.email;
        const password = error?.config.password;

        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;

          const accessToken = await refreshToken(email, password);
          prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return axiosPrivate(prevRequest);
        } else if (error.response.status === 0) {
          throw new Error("Username already taken.");
        }
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
