import { useEffect, useState } from "react";
import { ErrorMsg, LoadingSpinner, TwButton } from "components";
import { no_results } from "assets/images";
import { AiOutlineArrowLeft, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Modal } from "components";
import { useAppSelector } from "app/hooks";
import { User } from "interfaces";

import AddContactModal from "./AddContactModal";
import { getUserState } from "features/authentication/userSlice";
import { db } from "services/firebase";
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
    <section className="flex flex-col items-center p-1 py-4 sm:p-4 ">
      <Modal setShowModal={setShowModal}>
        {(showModal as boolean) && (
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

      {users.length !== 0 &&
        users.map((user: User, i: number) => (
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

      {isPending && <LoadingSpinner msg="fetching users..." />}

      {!users.length && searchVal.length !== 0 && (
        <ErrorMsg className="w-64" img={no_results} msg="no results found." />
      )}
    </section>
  );
};

export default AddContacts;
