import { useRef, useEffect, useState } from "react";

import {useGenerateToken} from '../'

const useAuth = () => {
  const [pendingMsg, setPendingMsg] = useState("");

  const generateToken = useGenerateToken();

  const makeLogin = async (email, pass) => {
    console.log("generateToken");
    setPendingMsg("generating token");
    const userToken = await generateToken(email,pass)
    console.log(userToken)
    setPendingMsg("done");

    return userToken;
  };

  const createUser = async (email,username,password) => {
      setPendingMsg("Creating User");

      const date = new Date();
      const timestamp = date.getTime();

      const userSignUpData = {
        username: username,
        email: email,
        password: password,
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

      const userToken = await makeLogin(email,password);

      return userToken;
  }

  return { makeLogin, createUser, pendingMsg };
};

export default useAuth;
