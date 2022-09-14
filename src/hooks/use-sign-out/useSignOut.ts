import { useAppDispatch } from "app/hooks";
import { logout } from "features/authentication";
import { useLocalStorage } from "hooks";
import { signOut } from "firebase/auth";
import { auth } from "services/firebase";

const useSignOut = () => {
  const dispatch = useAppDispatch();

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  const signOutUser = async () => {
    dispatch(logout());
    await signOut(auth);
    setSavedUserInfo(null);
    setSavedUserToken("");
    setKeepSignedIn(false);
  };

  return signOutUser;
};

export default useSignOut;
