import { useRef, useEffect, useState, useContext } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { motion } from "framer-motion";

import { InputForm } from "../";
import { UserContext } from "/src/Contexts";
import { useLocalStorage, useAuth } from "../../hooks";

export const SignIn = ({
  setPendingMsg,
  setIsSigningIn,
  setKeepSignedIn,
  keepSignedIn,
  pendingMsg,
}) => {
  const [errorMsg, setErrorMsg] = useState("");

  const userEmailRef = useRef();
  const userPassRef = useRef();

  const { signInUser } = useAuth(setPendingMsg, setErrorMsg);

  const handleLogin = (e) => {
    try {
      e.preventDefault();

      signInUser(userEmailRef.current.value, userPassRef.current.value);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-2xl font-semibold text-left text-center text-black dark:text-white">
          Sign in to Chately
        </label>
        <label className="text-sm text-center text-muted-light mb-4 text-black dark:text-muted-dark">
          Enter your credentials
        </label>
      </div>

      {errorMsg && (
        <p className="text-red-600 text-md text-center dark:text-red-500">{errorMsg}</p>
      )}

      <InputForm
        label="Email"
        type="email"
        placeHolder="e.g example123@example.com"
        inputRef={userEmailRef}
      />
      <InputForm
        label="Password"
        type="password"
        placeHolder="*********"
        inputRef={userPassRef}
      />
      <a
        onClick={() => setKeepSignedIn(!keepSignedIn)}
        className="flex flex-wrap gap-2 items-center hover:cursor-pointer hover:bg-muted-light/10 p-2 px-4 rounded-xl text-muted-light duration-200 text-black dark:text-muted-dark"
      >
        <div
          className={`p-0.5 border border-2 text-sm rounded-md bg-transparent duration-300 ${
            keepSignedIn
              ? `bg-primary-main text-white border-primary-main `
              : " text-transparent border-muted-light dark:border-muted-dark"
          }`}
        >
          <AiOutlineCheck />
        </div>
        Keep me signed in
      </a>

      {!pendingMsg && (
        <button className="bg-primary-main hover:bg-primary-tinted duration-300 rounded-xl p-2 px-4 text-white">
          Sign in
        </button>
      )}

      {pendingMsg && (
        <button disabled className="bg-primary-main hover:bg-primary-tinted duration-300 rounded-xl p-2 px-4 text-white">
          Signing in...
        </button>
      )}

      <p className="text-muted-light text-sm text-black dark:text-muted-dark">
        Don't have an account?{" "}
        <a
          onClick={() => setIsSigningIn(false)}
          className="text-primary-main hover:text-primary-tinted dark:text-primary-tinted dark:hover:text-primary-main font-semibold cursor-pointer duration-300"
        >
          Sign up
        </a>
      </p>
    </form>
  );
};
