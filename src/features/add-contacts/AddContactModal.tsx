import { ProfilePicture, TwButton } from "components";

import { User } from "interfaces";
import { useState } from "react";
import { useAppDispatch } from "hooks";
import { createToast } from "toastSlice";
import { changeChat } from "features/inbox/chatReducer";
import useAddContact from "./useAddContact";
import { GoLocation } from "react-icons/go";
import { useGetUserStatus } from "hooks";

interface AddContactModalProps {
  setShowModal: (state: boolean) => void;
  setSearchVal: (state: string) => void;
  currentUser: User | undefined;
  recipient: User;
}

const AddContactModal = ({
  setShowModal,
  setSearchVal,
  currentUser,
  recipient,
}: AddContactModalProps) => {
  const [isPending, setIsPending] = useState(false);
  const online = recipient && useGetUserStatus(recipient.uid.toString());

  const dispatch = useAppDispatch();
  const addContact = useAddContact();

  const addContactBtnHandler = async () => {
    try {
      if (!currentUser || !recipient) return;

      setIsPending(true);

      await addContact(currentUser, recipient);

      setSearchVal("");
      setShowModal(false);
      setIsPending(false);

      dispatch(changeChat(recipient));
      dispatch(createToast("Contact added successfuly."));
    } catch (error) {
      console.log(error);
    }
  };

  const isContacted = (userID: any) => {
    return currentUser?.contacts.find((contactId) => contactId === userID);
  };

  const cancelBtnHandler = () => setShowModal(false);

  return (
    <div className="flex flex-col gap-4 py-2 w-44">
      <div className="flex flex-col items-center text-center px-8">
        <ProfilePicture
          isOnline={online || false}
          photoURL={recipient.photoURL}
          size="large"
        />

        <h2 className="text-lg text-black dark:text-white">
          {recipient.displayName}
        </h2>
        <p className="text-muted-light dark:text-muted-dark">{recipient.bio}</p>
        <p className="text-sm text-muted-light dark:text-muted-dark flex items-center gap-1">
          <GoLocation /> {recipient.location}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {isContacted(recipient.uid) ? (
          <h1 className="text-green-500 text-center">Already in contact.</h1>
        ) : (
          <TwButton
            onClick={addContactBtnHandler}
            disabled={isPending}
            className="w-full flex justify-center py-1"
          >
            {isPending ? "Adding..." : "Add Contact"}
          </TwButton>
        )}
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
