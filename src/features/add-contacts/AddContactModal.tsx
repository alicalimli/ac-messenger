import { TwButton } from "components";

import { User } from "interfaces";
import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { createToast } from "toastSlice";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "services/firebase";
import { changeChat } from "features/inbox/chatReducer";

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

  const [isPending, setIsPending] = useState<boolean>(false);

  const addContactBtnHandler = async () => {
    try {
      if (!currentUser || !recipient) return;

      setIsPending(true);

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

      setShowModal(false);
      setSearchVal("");
      setIsPending(false);

      dispatch(changeChat(recipient));
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
          disabled={isPending}
          className="w-full flex justify-center py-1"
        >
          {isPending ? "Adding..." : "Add Contact"}
        </TwButton>
        <TwButton
          variant="transparent"
          onClick={cancelBtnHandler}
          disabled={isPending}
          className="w-full flex justify-center border border-muted-light/50 dark:border-muted-dark/50 py-1"
        >
          Cancel
        </TwButton>
      </div>
    </div>
  );
};

export default AddContactModal;
