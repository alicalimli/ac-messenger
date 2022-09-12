import { useDispatch } from "react-redux";
import { logout } from "features/authentication";
import { useLocalStorage } from "hooks";

const useSignOut = () => {
  const dispatch = useDispatch();

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  const signOut = () => {
    dispatch(logout());
    setSavedUserInfo(null);
    setSavedUserToken("");
    setKeepSignedIn(false);
  };

  return signOut;
};

export default useSignOut;
