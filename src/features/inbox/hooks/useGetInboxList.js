import { useEffect, useState, useContext } from "react";
import axios from "/src/api/axios";
import { UserTokenContext } from "/src/setup/app-context-manager";

const GET_INBOX_LISTS_URL = "/chat/mine";

const useGetInboxList = () => {
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [inboxList, setInboxList] = useState([]);

  useEffect(async () => {
    const response = await axios.get(GET_INBOX_LISTS_URL, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
    setInboxList([...inboxList, ...response.data]);
  }, []);
  console.log(inboxList);

  return inboxList;
};

export default useGetInboxList;
