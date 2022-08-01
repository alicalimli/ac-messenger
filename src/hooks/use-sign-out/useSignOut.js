import { useContext } from "react";

import {
  UserContext,
  UserTokenContext,
  CurrentChatContext,
} from "/src/setup/app-context-manager";

import { useLocalStorage } from "/src/hooks";

const useSignOut = (key, initialValue) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  const signOut = () => {
    setUserInfo(null);
    setUserToken("");

    setSavedUserInfo(null);
    setSavedUserToken("");
    setCurrentChat(null);
    setKeepSignedIn(false);
  };

  return signOut;
};

export default useSignOut;
