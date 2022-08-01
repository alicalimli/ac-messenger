import { useEffect, useState, useContext } from "react";
import axios from "/src/api/axios";
import { UserTokenContext } from "/src/setup/app-context-manager";

const GET_INBOX_LISTS_URL = "/chat/mine";

const useGetChats = () => {
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [chats, setChats] = useState([]);

  useEffect(async () => {
    const response = await axios.get(GET_INBOX_LISTS_URL, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
    setChats([...chats, ...response.data]);
  }, []);
  console.log(chats);

  return chats;
};

export default useGetChats;
