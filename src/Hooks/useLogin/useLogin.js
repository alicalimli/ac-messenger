import React, { PropTypes } from 'react';

const useLogin = () => {
  const makeLogin = async (setToken, email, pass) => {
    try{
        let formData = new FormData();
        formData.append("username", email);
        formData.append("password", pass);

        // Request login from the API
        const loginUser = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
          method: "POST",
          body: formData,
        });

        const loginResults = await loginUser.json();

        setToken(loginResults.access_token);

        if (!loginResults.access_token)
          throw new Error("Incorrect email or password");

    }catch(error){
      console.error(error);
      throw error;
    }
  }

  return makeLogin;
};

export default useLogin;
