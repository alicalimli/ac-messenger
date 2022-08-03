
import {useState, useContext} from 'react'
import { TwTrnButton, TwButton} from "/src/components";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { Modal } from '/src/components'
import { useGetUsers } from '/src/hooks'

import {UserContext} from '/src/setup/app-context-manager'

const AddContacts = ({ setSideBarContent }) => {
  const users = useGetUsers();
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [otherUser, setOtherUser] = useState();
  const [showModal, setShowModal] = useState();
  console.log(users)

  const contactClickHandler = (otherUser) => {
    setShowModal(true)
    setOtherUser(otherUser)
  };

  return (
    <section className="flex flex-col items-center p-4 px-8">
        <Modal setShowModal={setShowModal}>
          {showModal &&
            <div>
              <div className="flex flex-col items-center text-center p-4 px-8">
              <img
                className="bg-cover bg-center bg-transparent mb-2 w-16 h-16 rounded-full shadow-md"
                alt={`${otherUser.username}'s profile picture`}
                src={otherUser.profile}
              />
              <h2 className="text-lg text-black dark:text-white">
                {otherUser.username}
              </h2>
              <p className="text-muted-light dark:text-muted-dark">
                Front-end Developer
              </p>
            </div>
              <div className="flex flex-col gap-2">
                <TwButton addClass="w-full flex justify-center py-1">Add Contact</TwButton>
                <TwTrnButton addClass="w-full flex justify-center border border-muted-light/50 dark:border-muted-dark/50 py-1">Cancel</TwTrnButton>
              </div>
            </div>
          }
        </Modal>

        <TwTrnButton
          clickHandler={() => setSideBarContent("chats")}
          addClass="w-full flex gap-2"
        ><AiOutlineArrowLeft className="text-lg" /> Add Contacts</TwTrnButton>

        {users.map((user, i) => (
           <TwTrnButton key={i} clickHandler={() => contactClickHandler(user)} addClass="w-full flex gap-4">
            <div className="relative bg-transparent h-12 w-12">
              {user.active && <div className="bg-green-500 p-1.5 rounded-full absolute right-1 bottom-0"></div>}
              <img src={user.profile} className="w-full rounded-full" />
            </div>
            {user.username}
          </TwTrnButton>
        ))}
    </section>
  );
};

export default AddContacts;
