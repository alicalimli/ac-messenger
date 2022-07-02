import { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { InputForm } from "../../Components";

import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks";

const SignUp = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  const [user, setUser] = useContext(UserContext);

  const [userToken, setUserToken] = useLocalStorage("userToken", {});

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    console.log("creatingUser");

    const date = new Date();
    const timestamp = date.getTime();

    const formData = {
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
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(formData),
    });

    const res = await createUser.text();

    if (!res) return;

   let loginFormData = new FormData();
    loginFormData.append("username", userEmail);
    loginFormData.append("password", userPass);

    const loginUser = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
      method: "POST",
      body: loginFormData,
    });

    const loginResults = await loginUser.json();

    console.log(loginResults)

    setUser(
      Object.assign(user, {
        userName: userName,
        userEmail: userEmail,
      })
    );

    setUserToken(loginResults);
    navigate('/home')
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4">
      <form
        onSubmit={handleSignUp}
        className="w-full sm:w-96 flex flex-col gap-4 p-12 rounded-xl bg-white shadow-lg "
      >
        <label className="text-2xl text-left">Sign Up</label>

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
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-400 duration-300 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
