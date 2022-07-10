import { useRef, useEffect, useState, useContext } from "react";
import { AiOutlineCheck } from "react-icons/ai";
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
      setErrorMsg(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-2xl font-semibold text-left text-center">
          Sign in to Chately
        </label>
        <label className="text-sm text-center text-muted mb-4 ">
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
        className="flex flex-wrap gap-2 items-center hover:cursor-pointer hover:bg-muted/10 p-2 px-4 rounded-xl text-muted duration-200"
      >
        <div
          className={`p-0.5 border rounded-md bg-transparent duration-300 ${
            keepSignedIn
              ? `bg-primary-main text-white `
              : " text-transparent border-muted "
          }`}
        >
          <AiOutlineCheck />
        </div>
        Keep me signed in
      </a>

      <button className="bg-primary-main hover:bg-primary-tinted duration-300 rounded-xl p-2 px-4 text-white">
        Sign in
      </button>
      <p className="text-muted text-sm">
        Don't have an account?{" "}
        <a
          onClick={() => setIsSigningIn(false)}
          className="text-primary-main hover:text-primary-tinted font-semibold cursor-pointer duration-300"
        >
          Sign up
        </a>
      </p>
    </form>
  );
};

export default SignIn;
