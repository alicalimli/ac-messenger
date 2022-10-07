import { doc, getDoc } from "firebase/firestore";
import { User } from "interfaces";
import { db } from "services/firebase";

const useGetUser = () => {
  const getUserInfo = async (userId: string) => {
    const recipientDocRef = doc(db, "users", userId);
    const recipientData = (await getDoc(recipientDocRef)).data();

    return recipientData as unknown as User;
  };

  return getUserInfo;
};

export default useGetUser;
