import { useContext } from "react";
import { useDispatch } from "react-redux";
import { logout } from "/src/features/authentication";

import {
  CurrentChatContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import { useLocalStorage } from "/src/hooks";

const useSignOut = (key, initialValue) => {
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  const signOut = () => {
    dispatch(logout());
    setUserToken("");
    setSavedUserInfo(null);
    setSavedUserToken("");
    setCurrentChat(null);
    setKeepSignedIn(false);
  };

  return signOut;
};

export default useSignOut;
