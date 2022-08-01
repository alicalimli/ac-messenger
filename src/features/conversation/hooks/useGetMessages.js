import { useContext, useState, useEffect} from "react";
import { UserTokenContext } from "/src/setup/app-context-manager";

import axios from '/src/api/axios'
const GET_MSGs_URL = "/chat/msg"

const useGetMessages = (inboxHash) => {
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [messages, setMessages] = useState([]);

  useEffect(async ()=>{
    try{
      const response = await axios.get(`${GET_MSGs_URL}/${inboxHash}`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });

          const friend = setMessages((messages) => [
            ...messages,
            ...response.data,
          ]);

          console.log(response.data)
    }catch(error){
      console.error(error)
    }
  }, [inboxHash])

  return {messages, setMessages };
};

export default useGetMessages;
