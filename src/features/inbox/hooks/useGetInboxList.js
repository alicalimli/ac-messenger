import { useEffect, useState, useContext } from "react";
import axios from "/src/api/axios";
import { UserTokenContext } from "/src/setup/app-context-manager";

const GET_INBOX_LISTS_URL = "/chat/mine";

let inbox_cache = [];

const useGetInboxList = () => {
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [inboxList, setInboxList] = useState([]);

  useEffect(async () => {
    if (!inbox_cache.length) {
      const response = await axios.get(GET_INBOX_LISTS_URL, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
      setInboxList([...inboxList, ...response.data]);
      inbox_cache = response.data;
    } else {
      setInboxList([...inboxList, ...inbox_cache]);
    }
  }, []);
  console.log(inboxList);

  return inboxList;
};

export default useGetInboxList;
