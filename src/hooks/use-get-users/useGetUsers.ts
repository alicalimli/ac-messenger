import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  Query,
  query,
  where,
} from "firebase/firestore";
import { User } from "interfaces";
import { useState } from "react";
import { db } from "setup/firebase";

const useGetUsers = () => {
  let usersColRef: CollectionReference;

  const getUsers = async (userID: string) => {
    if (userID) {
      usersColRef = query(
        collection(db, "users"),
        where("uid", "!=", userID)
      ) as CollectionReference;
    } else {
      usersColRef = doc(db, "users") as unknown as CollectionReference;
    }

    const data = await getDocs(usersColRef as CollectionReference);

    const users = data.docs.map((doc) => {
      return { ...doc.data() };
    }) as User[];

    return users;
  };

  // const searchUser = async (searchVal: string) => {
  //   if (searchVal) {
  //     const usersColRef = query(
  //       collection(db, "users"),
  //       where("displayName", ">=", searchVal),
  //       where("displayName", "<=", searchVal + "\uf8ff")
  //     );

  //     const data = await getDocs(usersColRef);

  //     setUsers(
  //       data.docs.map((doc) => {
  //         return { ...doc.data() };
  //       }) as User[]
  //     );
  //   } else {
  //     getUsers();
  //   }
  // };

  return { getUsers };
};

export default useGetUsers;
