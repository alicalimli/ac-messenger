import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";

import { InputForm, TwButton } from "/src/common/components";
import { useLocalStorage, useAuth } from "../../hooks";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = ({ setPendingMsg, setIsSigningIn, pendingMsg }) => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false)

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false)

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false)

  const [confirmPwd, setConfirmPwd] = useState('');
  const [validConfirmPwd, setValidConfirmPwd] = useState(false)

  const [errorMsg, setErrorMsg] = useState("");

  const usernameRef = useRef();
  const confirmPassRef = useRef();

  const { signUpUser } = useAuth(setPendingMsg, setErrorMsg);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      const confirmPass = confirmPassRef.current;

      if (confirmPass.value !== password) {
        throw new Error("Passwords doesn't match.");
      }

      signUpUser(email, username, password);
    } catch (error) {
      setErrorMsg(error.message);
      setPendingMsg("");
      console.error(error);
    }
  };

  useEffect(()=> setErrorMsg('') ,[email,username,password])

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      {" "}
      <div className="flex flex-col gap-1">
        <label className="text-2xl font-semibold text-left text-center text-black dark:text-white">
          Sign up
        </label>
        <label className="text-sm text-muted-light dark:text-muted-dark text-center mb-4">
          Fill in the form
        </label>
      </div>

       <p className={`text-red-600 text-md text-center ${errorMsg ? "visible block" : "absolute invisible"}`}>{errorMsg}</p>

      <InputForm
        label="Email"
        type="email"
        inputRef={usernameRef}
        placeHolder="e.g example@email.com"
        invalidLabel="Please provide a valid Email Address"
        state={email}
        setState={setEmail}
      />
      <InputForm
        label="Username"
        type="text"
        placeHolder="e.g example123"
        minLength="6"
        invalidLabel="Please use at least 6 characters for the username."
        state={username}
        setState={setUsername}
      />
      <InputForm
        label="Password"
        type="password"
        placeHolder="*********"
        minLength="8"
        invalidLabel="Please use at least 8 characters for the password."
        state={password}
        setState={setPassword}
      />
      <InputForm
        label="Confirm Password"
        type="password"
        inputRef={confirmPassRef}
        placeHolder="*********"
        minLength="8"
        invalidLabel=""
      />
      <TwButton isDisabled={pendingMsg}>Sign Up</TwButton>
      <p className="text-muted-light dark:text-muted-dark text-sm">
        Already have an account?{" "}
        <a
          onClick={() => setIsSigningIn(true)}
          className="text-primary-main cursor-pointer hover:text-primary-tinted duration-300 font-semibold"
        >
          Login
        </a>
      </p>
    </form>
  );
};

export default SignUp;
