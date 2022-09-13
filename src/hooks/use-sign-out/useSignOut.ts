import { useAppDispatch } from "app/hooks";
import { logout } from "features/authentication";
import { useLocalStorage } from "hooks";

const useSignOut = () => {
  const dispatch = useAppDispatch();

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
