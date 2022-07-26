import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import { useAuth } from "../../hooks";
import { InputForm, TwButton, TwTrnButton } from "/src/components";

const SignIn = ({
  setPendingMsg,
  setIsSigningIn,
  setKeepSignedIn,
  keepSignedIn,
  pendingMsg,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const { signInUser } = useAuth(setPendingMsg, setErrorMsg);

  const handleLogin = (e) => {
    try {
      e.preventDefault();

      signInUser(email, password);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

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
        placeHolder="e.g example123@example.com"
      />
      <InputForm
        label="Password"
        type="password"
        state={password}
        setState={setPassword}
        placeHolder="*********"
      />

      <TwTrnButton
        clickHandler={() => setKeepSignedIn(!keepSignedIn)}
        btnType="button"
        addClass="flex flex-wrap gap-2 items-center "
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
      </TwTrnButton>

      <TwButton isDisabled={pendingMsg}>Sign In</TwButton>

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
