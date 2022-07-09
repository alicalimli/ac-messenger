import { useRef, useEffect, useState } from "react";

const generateToken = async (email, pass) => {
  let formData = new FormData();
  formData.append("username", email);
  formData.append("password", pass);

  // Request login from the API
  const fetchToken = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
    method: "POST",
    body: formData,
  });

  const fetchTokenResults = await fetchToken.json();

  if (!fetchTokenResults.access_token)
    throw new Error(fetchTokenResults.detail);

  console.log(fetchTokenResults.access_token);

  return fetchTokenResults.access_token;
};

const useAuth = () => {
  const [pendingMsg, setPendingMsg] = useState("");

  const makeLogin = async (email, pass) => {
    console.log("generateToken");
    setPendingMsg("generating token");
    const token = await generateToken(email, pass);
    console.log("done");
    setPendingMsg("done");

    return token;
  };

  return { makeLogin, pendingMsg };
};

export default useAuth;
