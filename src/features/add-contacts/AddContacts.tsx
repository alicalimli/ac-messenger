import { useEffect, useState } from "react";
import { TwButton } from "components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Modal } from "components";
import { useAppSelector } from "app/hooks";
import { User } from "interfaces";

import AddContactModal from "./AddContactModal";
import { getUserState } from "features/authentication/userSlice";
import { db } from "services/firebase";
import { collection, getDocs } from "firebase/firestore";

interface AddContactsProps {
  setSideBarContent: (state: string) => void;
}

const AddContacts = ({ setSideBarContent }: AddContactsProps) => {
  const [users, setUsers] = useState<User[] | any>([]);
  const usersColRef = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(usersColRef);

    setUsers(
      data.docs.map((doc) => {
        return { ...doc.data() };
      })
    );
    console.log(users);
  };

  const currentUser = useAppSelector(getUserState);

  const [recipient, setRecipient] = useState<User>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const contactClickHandler = (recipient: User) => {
    setShowModal(true);
    setRecipient(recipient);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="flex flex-col items-center p-4 px-8">
      <Modal setShowModal={setShowModal}>
        {(showModal as boolean) && (
          <AddContactModal
            setShowModal={setShowModal}
            currentUser={currentUser}
            recipient={recipient}
          />
        )}
      </Modal>

      <TwButton
        variant="transparent"
        onClick={() => setSideBarContent("chats")}
        className="w-full flex gap-2"
      >
        <AiOutlineArrowLeft className="text-lg" /> Add Contacts
      </TwButton>

      {users.map((user: User, i: number) => (
        <TwButton
          variant="transparent"
          key={i}
          onClick={() => contactClickHandler(user)}
          className="w-full flex gap-4"
        >
          <div className="relative bg-transparent h-12 w-12">
            {user.status === "on" && (
              <div className="bg-green-500 p-1.5 rounded-full absolute right-1 bottom-0"></div>
            )}
            <img src={user.photoURL} className="w-full rounded-full" />
          </div>
          {user.displayName}
        </TwButton>
      ))}
    </section>
  );
};

export default AddContacts;
