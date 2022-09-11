import { TwButton } from "components";
import Chat from "interfaces/chats";
import { UsersData, ChatsData } from "localdatas";

import User from "interfaces/users";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createToast } from "toast";

interface AddContactModalProps {
  setShowModal: (state: boolean) => void;
  currentUser: User | undefined;
  recipient: User | undefined;
}

const AddContactModal = ({
  setShowModal,
  currentUser,
  recipient,
}: AddContactModalProps) => {
  // const { addContact } = useAddContact(recipient);

  const dispatch = useDispatch();

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const addContactBtnHandler = () => {
    setIsBtnDisabled(true);

    const currentUserData = UsersData.find(
      (user) => user.user_id === currentUser?.user_id
    );
    const recipientData = UsersData.find(
      (user) => user.user_id === recipient?.user_id
    );
    const chatRoomId = `${currentUser?.user_id}-${recipient?.user_id}`;
    const ChatRoomData: Chat = {
      chat_room_id: chatRoomId,
      messages: [{ message: "blah", time: "test" }],
      last_message: "test",
      active_chat: false,
    };

    // Delay a bit to show loading msg
    setTimeout(() => {
      if (!currentUserData || !recipientData) return;
      currentUserData.inbox.push(chatRoomId);
      recipientData.inbox.push(chatRoomId);
      currentUserData.contacts.push(recipientData.user_id);
      recipientData.contacts.push(currentUserData.user_id);
      ChatsData.push(ChatRoomData);
      setShowModal(false);
      setIsBtnDisabled(false);
      dispatch(createToast("Contact added successfuly."));
    }, 1000);
  };

  const cancelBtnHandler = () => setShowModal(false);

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col items-center text-center px-8">
        <img
          className="bg-cover bg-center bg-transparent mb-2 w-16 h-16 rounded-full shadow-md"
          alt={`${recipient?.username}'s profile picture`}
          src={recipient?.profile}
        />
        <h2 className="text-lg text-black dark:text-white">
          {recipient?.username}
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
