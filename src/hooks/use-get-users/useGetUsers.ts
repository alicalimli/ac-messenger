import {
  collection,
  CollectionReference,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { User } from "interfaces";
import { db } from "setup/firebase";

const useGetUsers = () => {
  let usersColRef: CollectionReference;

  const getUsers = async (userID?: string) => {
    //  Exclude current user in the results when theres userID.
    if (userID) {
      usersColRef = query(
        collection(db, "users"),
        where("uid", "!=", userID)
      ) as CollectionReference;
    } else {
      usersColRef = collection(db, "users") as CollectionReference;
    }

    const data = await getDocs(usersColRef as CollectionReference);

    const users = data.docs.map((doc) => {
      return { ...doc.data() };
    }) as User[];

    return users;
  };

  const searchUser = async (searchVal: string) => {
    if (searchVal) {
      const usersColRef = query(
        collection(db, "users"),
        where("displayName", ">=", searchVal),
        where("displayName", "<=", searchVal + "\uf8ff")
      );

      const data = await getDocs(usersColRef);

      const users = data.docs.map((doc) => {
        console.log(doc.data());

        return { ...doc.data() };
      }) as User[];

      console.log(users);
      return users;
    } else {
      return getUsers();
    }
  };

  return { getUsers, searchUser };
};

export default useGetUsers;
