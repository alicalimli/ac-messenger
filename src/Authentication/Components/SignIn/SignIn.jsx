import { useRef, useEffect, useState, useContext } from "react";

import { motion } from "framer-motion";

import { InputForm } from "../";

import { UserContext } from "../../../Contexts";

import { useLocalStorage, useAuth } from "../../../Hooks";

const SignIn = ({
  setPendingMsg,
  setIsSigningIn,
  setKeepSignedIn,
  keepSignedIn,
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
      console.log("lalala");
      setErrorMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-2xl font-semibold text-left text-center">
          Sign in
        </label>
        <label className="text-sm text-slate-500 text-center mb-4 ">
          Enter your credentials
        </label>
      </div>

      {errorMsg && (
        <p className="text-red-600 text-md text-center">{errorMsg}</p>
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
        className="flex flex-wrap gap-2 items-center hover:cursor-pointer hover:bg-slate-500/10 p-2 px-4 rounded-xl text-slate-500 duration-200"
      >
        <input
          className="w-4"
          type="checkbox"
          checked={keepSignedIn}
          disabled
        />
        Keep me signed in
      </a>

      <button className="bg-blue-500 hover:bg-blue-400 duration-300 rounded-xl p-2 px-4 text-white">
        Sign in
      </button>
      <p className="text-slate-600 text-sm">
        Don't have an account?{" "}
        <a
          onClick={() => setIsSigningIn(false)}
          className="text-blue-500 cursor-pointer hover:text-blue-400 duration-300 font-semibold"
        >
          Sign up
        </a>
      </p>
    </form>
  );
};

export default SignIn;
