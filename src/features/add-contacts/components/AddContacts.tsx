import { useState, useContext } from "react";
import { TwButton } from "components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Modal } from "components";
import { useGetUsers } from "hooks";
import { UserContext } from "setup/app-context-manager";
import User from "interfaces/users";

import { UsersData } from "localdatas";

import AddContactModal from "./AddContactModal";

interface AddContactsProps {
  setSideBarContent: (state: string) => void;
}

const AddContacts = ({ setSideBarContent }: AddContactsProps) => {
  // Will update the type later on
  const users: User[] = UsersData;
  // const users: any = useGetUsers();
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [otherUser, setOtherUser] = useState<User>();
  const [showModal, setShowModal] = useState<boolean>(false);
  console.log(users);

  const contactClickHandler = (otherUser: User) => {
    setShowModal(true);
    setOtherUser(otherUser);
  };

  return (
    <section className="flex flex-col items-center p-4 px-8">
      <Modal setShowModal={setShowModal}>
        {(showModal as boolean) && (
          <AddContactModal setShowModal={setShowModal} otherUser={otherUser} />
        )}
      </Modal>

      <TwButton
        variant="transparent"
        onClick={() => setSideBarContent("chats")}
        className="w-full flex gap-2"
      >
        <AiOutlineArrowLeft className="text-lg" /> Add Contacts
      </TwButton>

      {users
        .filter((user: User) => user.user_id !== userInfo.user_id)
        .map((user: User, i: number) => (
          <TwButton
            variant="transparent"
            key={i}
            onClick={() => contactClickHandler(user)}
            className="w-full flex gap-4"
          >
            <div className="relative bg-transparent h-12 w-12">
              {user.status && (
                <div className="bg-green-500 p-1.5 rounded-full absolute right-1 bottom-0"></div>
              )}
              <img src={user.profile} className="w-full rounded-full" />
            </div>
            {user.username}
          </TwButton>
        ))}
    </section>
  );
};

export default AddContacts;
