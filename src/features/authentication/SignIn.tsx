import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import useAuth from "./useAuth";
import { InputForm, TwButton } from "components";

interface SignInProps {
  setPendingMsg: (state: string) => void;
  setIsSigningIn: (state: boolean) => void;
  setKeepSignedIn: (state: boolean) => void;
  keepSignedIn: boolean;
  pendingMsg: string;
}

const SignIn = ({
  setPendingMsg,
  setIsSigningIn,
  setKeepSignedIn,
  keepSignedIn,
  pendingMsg,
}: SignInProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState<string>("");

  const { signInUser } = useAuth(setPendingMsg, setErrorMsg);

  const handleLogin = (e: React.FormEvent) => {
    try {
      e.preventDefault();

      signInUser(email, password);
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-2xl font-semibold text-center text-black dark:text-white">
          Sign in to Chately
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

      <TwButton type="submit" disabled={pendingMsg as unknown as boolean}>
        Sign In
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
    </form>
  );
};

export default SignIn;
