import { useEffect, useState } from "react";
import axios from "/src/api/axios";

const GET_INBOX_LISTS_URL = "/chat/mine";

const useGetInboxList = () => {
  const [inboxList, setInboxList] = useState([])

  useEffect(async ()=>{
    const response = await axios(GET_INBOX_LISTS_URL);
    setUsers(response.data);
  },[])

  return inboxList;
};

export default useGetInboxList;
