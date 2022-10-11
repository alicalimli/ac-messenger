import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "setup/firebase";

const useGetUserStatus = (uid: string) => {
  const [online, setOnline] = useState<boolean>(false);

  const getUserStatus = async () => {
    try {
      if (!uid) {
        setOnline(false);
        return;
      }

      const userDocRef = doc(db, "users", uid);
      const userDocData = (await getDoc(userDocRef)).data();
      setOnline(userDocData?.status === "online" ? true : false);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserStatus();
  }, [uid]);
  return online;
};

export default useGetUserStatus;
