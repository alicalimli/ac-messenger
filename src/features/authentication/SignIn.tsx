import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import { InputForm, TwButton } from "components";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getPendingMsg, makePendingMsg } from "toastSlice";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "services/firebase";

interface SignInProps {
  setIsSigningIn: (state: boolean) => void;
  setKeepSignedIn: (state: boolean) => void;
  keepSignedIn: Boolean;
}

const SignIn = ({
  setIsSigningIn,
  setKeepSignedIn,
  keepSignedIn,
}: SignInProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const pendingMsg = useAppSelector(getPendingMsg);
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(makePendingMsg("Signing In..."));

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(makePendingMsg(""));
      })
      .catch((error) => {
        dispatch(makePendingMsg(""));
        setErrorMsg(error.message);
      });
  };

  const handleGoogleLogin = () => {
    dispatch(makePendingMsg("Signing In With Google..."));
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        dispatch(makePendingMsg(""));
      })
      .catch((error) => {
        dispatch(makePendingMsg(""));
        setErrorMsg(error.message);
      });
  };

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-3xl font-semibold text-center text-black dark:text-white">
          ACMessenger
        </label>
        <label className="text-sm text-center text-muted-light mb-4 text-black dark:text-muted-dark">
          Enter your credentials
        </label>
      </div>

      <p
        className={`text-red-600 text-md text-center ${
          errorMsg ? "visible block" : "absolute invisible"
        }`}
      >
        {errorMsg}
      </p>

      <InputForm
        label="Email"
        type="email"
        state={email}
        setState={setEmail}
        placeholder="e.g example123@example.com"
      />
      <InputForm
        label="Password"
        type="password"
        state={password}
        setState={setPassword}
        placeholder="*********"
      />

      <TwButton
        onClick={() => setKeepSignedIn(!keepSignedIn)}
        variant="transparent"
        type="button"
        className="flex flex-wrap gap-2 items-center "
      >
        <div
          className={`p-0.5 border-2 text-sm rounded-md bg-transparent duration-300 ${
            keepSignedIn
              ? `bg-primary-main text-white border-primary-main `
              : " text-transparent border-muted-light dark:border-muted-dark"
          }`}
        >
          <AiOutlineCheck />
        </div>
        Keep me signed in
      </TwButton>

      <TwButton type="submit" disabled={pendingMsg as boolean}>
        Sign in
      </TwButton>

      <p className="text-muted-light text-sm text-black dark:text-muted-dark">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => setIsSigningIn(false)}
          className="text-primary-main hover:text-primary-tinted dark:text-primary-tinted dark:hover:text-primary-main font-semibold cursor-pointer duration-300"
        >
          Sign up
        </button>
      </p>

      <div className="flex flex-col gap-2 mt-4">
        <TwButton
          type="button"
          onClick={handleGoogleLogin}
          disabled={pendingMsg as boolean}
          className="justify-center text-primary-tinted dark:text-primary-shaded"
          variant="transparent"
        >
          Sign In With Google
        </TwButton>
        <TwButton
          type="button"
          className="justify-center text-primary-tinted dark:text-primary-shaded"
          variant="transparent"
        >
          Sign In With Twitter
        </TwButton>
      </div>
    </form>
  );
};

export default SignIn;
