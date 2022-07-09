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

  return { makeLogin, pendingMsg };
};

export default useAuth;
