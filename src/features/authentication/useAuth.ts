import { useDispatch } from "react-redux";
import { login } from "./user";
import { UsersData } from "localdatas";

const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

interface useAuth {
  setPendingMsg: (state: string) => void;
  setErrorMsg: (state: string) => void;
}

type setMessageType = (state: string) => void;

const useAuth = (
  setPendingMsg: setMessageType,
  setErrorMsg: setMessageType
) => {
  const dispatch = useDispatch();

  const signInUser = async (email: string, pass: string) => {
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

      // Delay the login for 500ms to show pending msg
      setTimeout(() => {
        dispatch(login(UserData));
        setPendingMsg("");
      }, 500);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  const signUpUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      setErrorMsg("");
      throw new Error("Creating user is not available");
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
      setPendingMsg("");
    }
  };

  return { signInUser, signUpUser };
};

export default useAuth;
