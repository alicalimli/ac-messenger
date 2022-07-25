import { useEffect, useState } from "react";
import axios from "/src/api/axios";

const GET_USERS_URL = "/users";

const useGetUsers = () => {
  const [users,setUsers] = useState([1,3,2])

  useEffect(async ()=>{
    const response = await axios(GET_USERS_URL);
    const allUsers = response.data;

    setUsers(allUsers);
  },[])

  return users;
};

export default useGetUsers;
