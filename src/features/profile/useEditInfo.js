import { useState, useContext } from "react";
import { useAxiosPrivate } from "/src/hooks";
import { ToastMsgContext } from "/src/setup/app-context-manager";
import { UserContext, UserTokenContext } from "/src/setup/app-context-manager";

const useEditInfo = () => {
  const axiosPrivate = useAxiosPrivate();

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [toastMsg, setToastMsg] = useContext(ToastMsgContext);

  const [pendingMsg, setPendingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const editInfo = async (email, username, password) => {
    try {
      setErrorMsg("");
      setPendingMsg("Changing Info...");

      const changeInfoData = {
        profile: userInfo.profile,
        username: username,
      };

      const changeInfo = await axiosPrivate.put(
        "http://127.0.0.1:8000/api/v1/users/",
        JSON.stringify(changeInfoData),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
          email: email,
          password: password,
        }
      );

      setPendingMsg("");
      setUserInfo(Object.assign(userInfo, { username: username }));
      setToastMsg("Changed Sucessfully");
    } catch (error) {
      setErrorMsg(error.message);
      setPendingMsg("");
      throw error;
    }
  };
  return { pendingMsg, setPendingMsg, errorMsg, setErrorMsg, editInfo };
};

export default useEditInfo;
