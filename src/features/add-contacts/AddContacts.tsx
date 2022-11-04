import { ErrorMsg, LoadingSpinner, ProfilePicture, TwButton } from "components";
import { getUserState } from "features/authentication/userSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useAppDispatch, useAppSelector, useGetUsers } from "hooks";
import { useEffect, useRef, useState } from "react";
import { no_results } from "assets/images";
import { Modal } from "components";
import { User } from "interfaces";

import AddContactModal from "./AddContactModal";
import { changeSideContent } from "reducers/sideContentReducer";

interface AddContactsProps {}

const AddContacts = () => {
  const { user: currentUser } = useAppSelector(getUserState);
  const { users, isPending, searchUser, getUsers } = useGetUsers(
    currentUser.uid
  );

  const [recipient, setRecipient] = useState<User>();
  const [searchVal, setSearchVal] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLElement>(null);

  const dispatch = useAppDispatch();

  const searchChangeHandler = (e: any) => {
    const searchVal = e.target.value;
    setSearchVal(searchVal);
    searchUser(searchVal, currentUser);
  };

  const contactClickHandler = (recipient: User) => {
    setShowModal(true);
    setRecipient(recipient);
  };
  const backBtnHandler = (content: string) => {
    dispatch(changeSideContent({ content }));
  };

  const scrollHandler = () => {
    const container = scrollContainerRef.current;

    if (!container) return;

    let triggerHeight = container.scrollTop + container.offsetHeight;
    if (triggerHeight >= container.scrollHeight) {
      getUsers(currentUser.uid);
    }
  };

  return (
    <aside className="flex flex-col items-center p-1 py-4 sm:p-4 h-full">
      {recipient && (
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
      )}

      <header className="w-full">
        <TwButton
          className="w-full flex gap-2"
          variant="transparent"
          onClick={() => backBtnHandler("chats")}
        >
          <AiOutlineArrowLeft className="text-lg" /> Add Contacts
        </TwButton>
      </header>

      <form className="w-full p-4" autoComplete="off">
        <label htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            value={searchVal}
            onChange={searchChangeHandler}
            placeholder="Search"
            className="text p-2 px-4 w-full rounded-full bg-muted-light/10 dark:bg-slate-700"
          />
        </label>
      </form>

      <main
        onScroll={scrollHandler}
        ref={scrollContainerRef}
        className="flex flex-col w-full gap-1 overflow-scroll scrollbar-hide"
      >
        {users?.length !== 0 &&
          users?.map((user: User, i: number) => (
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
              <div className="flex flex-col text-left">
                <p className="text-md">{user.displayName}</p>
                <p className="text-muted text-sm ">{user.bio}</p>
              </div>
            </TwButton>
          ))}

        {isPending && <LoadingSpinner msg="fetching users..." />}

        {!users?.length && searchVal.length !== 0 && (
          <ErrorMsg className="w-64" img={no_results} msg="no results found." />
        )}
      </main>
    </aside>
  );
};

export default AddContacts;
