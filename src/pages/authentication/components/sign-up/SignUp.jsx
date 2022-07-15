import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";

import { InputForm, TwButton } from "/src/common/components";
import { useLocalStorage, useAuth } from "../../hooks";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$]).{8,24}$/;

const SignUp = ({ setPendingMsg, setIsSigningIn, pendingMsg }) => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false)

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false)

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false)

  const [errorMsg, setErrorMsg] = useState("");

  const usernameRef = useRef();

  const { signUpUser } = useAuth(setPendingMsg, setErrorMsg);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      if(!validEmail || !validUsername || !validPassword) throw new Error("Invalid Entry.")

      signUpUser(email, username, password);
    } catch (error) {
      setErrorMsg(error.message);
      setPendingMsg("");
      console.error(error);
    }
  };

  useEffect(() => setErrorMsg(""), [email, username, password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConfirmPwd(password === confirmPwd);
  }, [password, confirmPwd]);

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
        stateFocus={emailFocus}
        setStateFocus={setEmailFocus}
        inputRef={usernameRef}
        placeHolder="e.g example@email.com"
        isValid={validEmail}
        instruction="Please input a valid email."
      />
      <InputForm
        label="Username"
        type="text"
        state={username}
        setState={setUsername}
        stateFocus={usernameFocus}
        setStateFocus={setUsernameFocus}
        placeHolder="e.g example123"
        isValid={validUsername}
        instruction="Must be 4 to 24 characters and begins with a letter. Hyphen and underscore are allowed"
      />
      <InputForm
        label="Password"
        type="password"
        state={password}
        setState={setPassword}
        stateFocus={passwordFocus}
        setStateFocus={setPasswordFocus}
        placeHolder="*********"
        isValid={validPassword}
        instruction='8-24 characters and must include upper and lower case characters.Numbers and Dollar or Hashtag sign are required.'
      />
      <InputForm
        label="Confirm Password"
        type="password"
        placeHolder="*********"
        state={confirmPwd}
        setState={setConfirmPwd}
        stateFocus={confirmPwdFocus}
        setStateFocus={setConfirmPwdFocus}
        isValid={validConfirmPwd}
        instruction="Should match the first password."
      />
      <TwButton isDisabled={!validEmail || !validUsername || !validConfirmPwd || pendingMsg ? true : false}>Sign Up</TwButton>
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
