import React, { useCallback } from "react";

const useLogin = () => {
  const makeLogin = useCallback(async (setToken, email, pass, setErrorMsg) => {
    try {
      let formData = new FormData();
      formData.append("username", email);
      formData.append("password", pass);

      // Request login from the API
      const loginUser = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        body: formData,
      });

      const loginResults = await loginUser.json();

      if (!loginResults.access_token) throw new Error(loginResults.detail);

      setToken(loginResults.access_token);
    } catch (error) {
      console.error(error.message);
      setErrorMsg(error.message)

      errorTimeout = setTimeout(() => setErrorMsg(null), 5000);
    }
  });

  return makeLogin;
};

export default useLogin;
