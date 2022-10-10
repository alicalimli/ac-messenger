import { useEffect, useState } from "react";
import { ErrorMsg, LoadingSpinner, ProfilePicture, TwButton } from "components";
import { no_results } from "assets/images";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Modal } from "components";
import { useAppSelector } from "hooks";
import { User } from "interfaces";

import AddContactModal from "./AddContactModal";
import { getUserState } from "features/authentication/userSlice";
import { db } from "setup/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface AddContactsProps {
  setSideBarContent: (state: string) => void;
}

const AddContacts = ({ setSideBarContent }: AddContactsProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [recipient, setRecipient] = useState<User>();

  const [searchVal, setSearchVal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const { user: currentUser } = useAppSelector(getUserState);

  const searchChangeHandler = (e: any) => setSearchVal(e.target.value);

  const getUsers = async () => {
    if (!currentUser) return;

    setIsPending(true);

    const usersColRef = query(
      collection(db, "users"),
      where("uid", "!=", currentUser.uid)
    );

    const data = await getDocs(usersColRef);

    setUsers(
      data.docs.map((doc) => {
        return { ...doc.data() };
      }) as User[]
    );

    setIsPending(false);
  };

  const contactClickHandler = (recipient: User) => {
    setShowModal(true);
    setRecipient(recipient);
  };

  const searchUser = async () => {
    if (searchVal) {
      const usersColRef = query(
        collection(db, "users"),
        where("displayName", ">=", searchVal),
        where("displayName", "<=", searchVal + "\uf8ff")
      );

      const data = await getDocs(usersColRef);

      setUsers(
        data.docs.map((doc) => {
          return { ...doc.data() };
        }) as User[]
      );
    } else {
      getUsers();
    }
  };

  useEffect(() => {
    searchUser();
  }, [searchVal]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="flex flex-col items-center p-1 py-4 sm:p-4 h-full">
      <Modal setShowModal={setShowModal}>
        {(showModal as boolean) && (recipient as unknown as boolean) && (
          <AddContactModal
            setShowModal={setShowModal}
            setSearchVal={setSearchVal}
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

      <form className="w-full p-4" autoComplete="off">
        <label htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            value={searchVal}
            onChange={searchChangeHandler}
            placeholder="Search"
            className="p-2 px-4 w-full rounded-full text-black dark:text-white bg-muted-light/10 dark:bg-slate-700"
          />
        </label>
      </form>

      <div className="flex flex-col w-full gap-1 overflow-scroll scrollbar-hide">
        {users.length !== 0 &&
          users.map((user: User, i: number) => (
            <TwButton
              variant="transparent"
              key={i}
              onClick={() => contactClickHandler(user)}
              className="w-full flex gap-4"
            >
              <ProfilePicture
                isOnline={false}
                photoURL={user.photoURL}
                size="small"
              />
              {user.displayName}
            </TwButton>
          ))}
        {isPending && <LoadingSpinner msg="fetching users..." />}
        {!users.length && searchVal.length !== 0 && (
          <ErrorMsg className="w-64" img={no_results} msg="no results found." />
        )}
      </div>
    </section>
  );
};

export default AddContacts;
