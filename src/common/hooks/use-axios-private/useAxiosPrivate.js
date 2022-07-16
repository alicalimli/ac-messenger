import { axiosPrivate } from "/src/api/axios";
import { useEffect, useContext } from "react";
import { UserContext, UserTokenContext } from "/src/setup/app-context-manager";
import { useGenerateToken } from "../";

const useAxiosPrivate = () => {
	const generateToken = useGenerateToken();
	const [userInfo, setUserInfo] = useContext(UserContext);
	const [userToken,setUserToken] = useContext(UserTokenContext)

	useEffect(() => {

		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if(!config.headers['Authorization']){
					config.headers['Authorization'] = `Bearer ${userToken}`
				}
				return config;
			  }, (error) => Promise.reject(error)
			)

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 401 && !prevRequest.sent) {
					console.log(error)
					prevRequest.sent = true;
					const email = "admin@chately.com";
					const pass = "admin1234";
					const accessToken = await generateToken(email, pass);
					prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
					return axiosPrivate(prevRequest);
				}
			}, (error) => Promise.reject(error)
		);

		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept)
			axiosPrivate.interceptors.response.eject(responseIntercept)
		}
	}, [userInfo, generateToken]);

	return (axiosPrivate);
};

export default useAxiosPrivate;
