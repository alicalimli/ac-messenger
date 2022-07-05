import { useRef, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputForm } from "../../Components";

import { UserContext } from "../../Contexts";

import { useLocalStorage, useAuth } from "../../Hooks";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const userEmailRef = useRef();
  const userPassRef = useRef();

  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  const navigate = useNavigate();
  const authenticate = useAuth();

  console.log(authenticate)

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      let loginFormData = new FormData();
      loginFormData.append("username", userEmailRef.current.value);
      loginFormData.append("password", userPassRef.current.value);

      // Request login from the API
      const loginUser = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        body: loginFormData,
      });

      const loginResults = await loginUser.json();

      setUserToken(loginResults.access_token);
      console.log(userToken)

      if (!loginResults.access_token)
        throw new Error("Incorrect email or password");

      console.log(authenticate);

      authenticate();
    } catch (error) {
      setErrorMsg(error.message);

      console.error(error);
      const errorTimeout = setTimeout(() => setErrorMsg(null), 5000);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4">
      <form
        onSubmit={handleLogin}
        className="w-full sm:w-96 flex flex-col gap-4 p-12 rounded-xl bg-white shadow-lg "
      >
        <div className="flex flex-col gap-1">
          <label className="text-2xl font-semibold text-left text-center">
            Sign in
          </label>
          <label className="text-sm text-slate-500 text-center mb-4 ">
            Enter your credentials
          </label>
        </div>

        {errorMsg && (
          <p className="bg-red-600/10 rounded-xl p-4 border border-red-500 text-red-600">
            {errorMsg}
          </p>
        )}

        <InputForm
          label="Email"
          type="email"
          placeHolder="e.g example123@example.com"
          inputRef={userEmailRef}
        />
        {console.log(userEmailRef)}
        <InputForm
          label="Password"
          type="password"
          placeHolder="*********"
          inputRef={userPassRef}
        />
        <div className="flex flex-wrap gap-2 items-center">
          <input className="w-4" type="checkbox" />
          <label htmlFor="check-remember" className=" text-slate-500">
            Remember me
          </label>
          <a href="#" className="ml-0 md:ml-auto text-blue-500 ">
            Forgot password?
          </a>
        </div>

        <button className="bg-blue-500 hover:bg-blue-400 duration-300 rounded-xl p-2 px-4 text-white">
          Sign in
        </button>
        <p className="text-slate-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-400 duration-300 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
