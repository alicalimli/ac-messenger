import { useContext } from 'react'

import {
  UserContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import { useLocalStorage } from "/src/hooks";

const useSignOut = (key, initialValue) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

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
    setKeepSignedIn(false);
  }

  return signOut;
};

export default useSignOut;
