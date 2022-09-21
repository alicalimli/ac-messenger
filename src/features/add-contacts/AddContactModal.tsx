import { TwButton } from "components";

import { User } from "interfaces";
import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { createToast } from "toastSlice";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "services/firebase";

interface AddContactModalProps {
  setShowModal: (state: boolean) => void;
  setSearchVal: (state: string) => void;
  currentUser: User | undefined;
  recipient: User | undefined;
}

const AddContactModal = ({
  setShowModal,
  setSearchVal,
  currentUser,
  recipient,
}: AddContactModalProps) => {
  const dispatch = useAppDispatch();

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const addContactBtnHandler = async () => {
    try {
      if (!currentUser || !recipient) return;

      const combinedId =
        currentUser.uid > recipient.uid
          ? currentUser.uid + recipient.uid
          : recipient.uid + currentUser.uid;

      const chatDocRef = doc(db, "chats", String(combinedId));
      const userChatDocRef = doc(db, "userChats", String(currentUser.uid));
      const recipientChatDocRef = doc(db, "userChats", String(recipient.uid));
      const chatDocData = await getDoc(chatDocRef);

      if (!chatDocData.exists()) {
        await setDoc(chatDocRef, { messages: [] });

        console.log(currentUser.uid);
        await updateDoc(userChatDocRef, {
          [combinedId + ".userInfo"]: recipient,
          [combinedId + ".lastMessage"]: serverTimestamp(),
        });

        await updateDoc(recipientChatDocRef, {
          [combinedId + ".userInfo"]: currentUser,
          [combinedId + ".lastMessage"]: serverTimestamp(),
        });
      }

      setShowModal(false);
      setSearchVal("");
      setIsBtnDisabled(false);
      dispatch(createToast("Contact added successfuly."));
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBtnHandler = () => setShowModal(false);

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col items-center text-center px-8">
        <img
          className="bg-cover bg-center bg-transparent mb-2 w-16 h-16 rounded-full shadow-md"
          alt={`${recipient?.displayName}'s profile picture`}
          src={recipient?.photoURL}
        />
        <h2 className="text-lg text-black dark:text-white">
          {recipient?.displayName}
        </h2>
        <p className="text-muted-light dark:text-muted-dark">
          Front-end Developer
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <TwButton
          onClick={addContactBtnHandler}
          disabled={isBtnDisabled}
          className="w-full flex justify-center py-1"
        >
          {isBtnDisabled ? "Adding..." : "Add Contact"}
        </TwButton>
        <TwButton
          variant="transparent"
          onClick={cancelBtnHandler}
          disabled={isBtnDisabled}
          className="w-full flex justify-center border border-muted-light/50 dark:border-muted-dark/50 py-1"
        >
          Cancel
        </TwButton>
      </div>
    </div>
  );
};

export default AddContactModal;
