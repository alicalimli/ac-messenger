import { useState, useEffect, useContext } from "react";
import { ToastMsgContext } from "/src/setup/app-context-manager";
import { UserContext, UserTokenContext } from "/src/setup/app-context-manager";

import axios from "/src/api/axios";
const ADD_CONTACT_URL = '/chat/update'

const useAddContact = (otherUser) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

  const addContact = async () => {
    try {
      const addContactData = {
      	   "sender_id": +userInfo.user_id,
          "recepient_id": +otherUser.id,
          "msg": "string",
          "timestamp": "string",
          "read": true
      }

      const response = await axios.post(
        ADD_CONTACT_URL,
        JSON.stringify(addContactData),
        {
        withCredentials: true,
        }
      );
      console.log(response)

      setToastMsg("Contact added.");
    } catch (error) {
   		console.error(error);
    }
  };
  return { addContact };
};

export default useAddContact;
