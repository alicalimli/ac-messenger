import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { User } from "interfaces";
import { useEffect, useState } from "react";
import { db } from "services/firebase";

const useAddContact = () => {
  const addContact = async (currentUser: User, recipient: User) => {
    try {
      const combinedId =
        currentUser.uid > recipient.uid
          ? currentUser.uid + recipient.uid
          : recipient.uid + currentUser.uid;

      const userDocRef = doc(db, "users", currentUser.uid.toString());
      const recipientDocRef = doc(db, "users", recipient.uid.toString());

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
          [combinedId + ".userInfo"]: recipient,
          [combinedId + ".lastMessage"]: {
            message: "contacted user.",
            date: serverTimestamp(),
          },
        });

        await updateDoc(recipientChatDocRef, {
          [combinedId + ".userInfo"]: currentUser,
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
