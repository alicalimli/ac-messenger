import { useState, useEffect, useContext } from "react";

import { motion } from "framer-motion";

import { InputForm } from "../../Components";

import { UserContext } from "../../Contexts";

import { useLocalStorage, useGenerateToken } from "../../Hooks";

const SignUp = ({ setIsSigningIn, setUserToken, setPendingMsg }) => {
  const [errorMsg, setErrorMsg] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  const generateToken = useGenerateToken();

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      setPendingMsg("Creating User");

      const date = new Date();
      const timestamp = date.getTime();

      const userSignUpData = {
        username: userName,
        email: userEmail,
        password: userPass,
        status: true,
        is_active: true,
        profile: "default.png",
        websocket_id: timestamp.toString(),
      };

      const createUser = await fetch("http://127.0.0.1:8000/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSignUpData),
      });

      const createUserRes = await createUser.json();
      if (!createUserRes.id) throw new Error(createUserRes.detail[0].msg);

      // Login user
      generateToken(
        setUserToken,
        userEmail,
        userPass,
        setErrorMsg,
        setPendingMsg
      );
    } catch (error) {
      setErrorMsg(error.message);
      setPendingMsg("");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-4"
    >
      {" "}
      <div className="flex flex-col gap-1">
        <label className="text-2xl font-semibold text-left text-center">
          Sign up
        </label>
        <label className="text-sm text-slate-500 text-center mb-4 ">
          Fill in the form
        </label>
      </div>
      {errorMsg && (
        <p className="text-red-600 text-md text-center">{errorMsg}</p>
      )}
      <InputForm
        label="Email"
        type="email"
        placeHolder="e.g example@email.com"
        isControlled="true"
        invalidLabel="Please provide a valid Email Address"
        state={userEmail}
        setState={setUserEmail}
      />
      <InputForm
        label="Username"
        type="text"
        placeHolder="e.g example123"
        minLength="6"
        invalidLabel="Please use at least 6 characters for the username."
        isControlled="true"
        state={userName}
        setState={setUserName}
      />
      <InputForm
        label="Password"
        type="password"
        placeHolder="*********"
        minLength="8"
        invalidLabel="Please use at least 8 characters for the password."
        isControlled="true"
        state={userPass}
        setState={setUserPass}
      />
      <button className="bg-blue-500 hover:bg-blue-400 duration-300 rounded-xl p-2 px-4 text-white">
        Sign Up
      </button>
      <p className="text-slate-600 text-sm">
        Already have an account?{" "}
        <a
          onClick={() => setIsSigningIn(true)}
          className="text-blue-500 cursor-pointer hover:text-blue-400 duration-300 font-semibold"
        >
          Login
        </a>
      </p>
    </form>
  );
};

export default SignUp;
