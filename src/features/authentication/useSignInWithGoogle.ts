import { auth, googleAuthProvider } from "services/firebase";
import { signInWithPopup } from "firebase/auth";

const useSignInWithGoogle = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleAuthProvider);
    console.log(result);
  };

  return signInWithGoogle;
};

export default useSignInWithGoogle;
