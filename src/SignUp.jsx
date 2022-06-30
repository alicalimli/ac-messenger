import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import InputForm from "./InputForm.jsx";

const SignUp = () => {
  const userEmailRef = useRef(null);
  const userNameRef = useRef(null);
  const userPassRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!userNameRef.current.value && !userPassRef.current.value && !userEmailRef.current.value) {
      console.log('Input your password and username')
      return;
    }

    console.log("creatingUser")

    const formData = {
      "username": userNameRef.current.value,
      "password": userPassRef.current.value,
      "email": userEmailRef.current.value,
    }

    const createUser = await fetch("http://127.0.0.1:8000/api/v1/users/", { method: "POST", body: formData });

    const res = await createUser.text();
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
          inputRef={userEmailRef}
        />
        <InputForm
          label="Username"
          type="text"
          placeHolder="e.g example123"
          inputRef={userNameRef}
        />
        <InputForm
          label="Password"
          type="password"
          placeHolder="*********"
          inputRef={userPassRef}
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
