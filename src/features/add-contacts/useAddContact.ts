import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { User } from "interfaces";
import { db } from "setup/firebase";
import { createCombinedId } from "utils";

const useAddContact = () => {
  const addContact = async (currentUser: User, recipient: User) => {
    try {
      const combinedId = createCombinedId(currentUser.uid, recipient.uid);

      const userDocRef = doc(db, "users", currentUser.uid);
      const recipientDocRef = doc(db, "users", recipient.uid);

      const chatDocRef = doc(db, "chats", String(combinedId));
      const chatDocData = await getDoc(chatDocRef);

      const userChatDocRef = doc(db, "userChats", String(currentUser.uid));
      const recipientChatDocRef = doc(db, "userChats", String(recipient.uid));

      if (!chatDocData.exists()) {
        await setDoc(chatDocRef, { messages: [] });

        await updateDoc(userDocRef, {
          contacts: arrayUnion(recipient.uid),
        });

        await updateDoc(recipientDocRef, {
          contacts: arrayUnion(currentUser.uid),
        });

        await updateDoc(userChatDocRef, {
          [combinedId + ".userInfo"]: { uid: recipient.uid },
          [combinedId + ".lastMessage"]: {
            message: "contacted user.",
            date: serverTimestamp(),
          },
        });

        await updateDoc(recipientChatDocRef, {
          [combinedId + ".userInfo"]: { uid: currentUser.uid },
          [combinedId + ".lastMessage"]: {
            message: "contacted user.",
            date: serverTimestamp(),
          },
          [combinedId + ".seen"]: false,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  return addContact;
};

export default useAddContact;
