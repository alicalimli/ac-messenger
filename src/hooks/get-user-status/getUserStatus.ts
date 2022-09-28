import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "services/firebase";

const getUserStatus = (uid: string) => {
  const [online, setOnline] = useState<boolean>(false);

  const getUserStatus = async () => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocData = (await getDoc(userDocRef)).data();
      setOnline(userDocData?.status === "online" ? true : false);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserStatus();
  }, []);
  return online;
};

export default getUserStatus;
