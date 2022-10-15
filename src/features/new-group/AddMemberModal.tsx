import { ProfilePicture, TwButton } from "components";
import { getUserState } from "features/authentication/userSlice";
import { useAppSelector, useGetUsers } from "hooks";
import { User } from "interfaces";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface AddMemberModalProps {
  membersID: string[];
  fetchMembers: any;
  setShowModal: (state: boolean) => void;
  setMembersID: (state: string[] | any) => void;
}

const AddMemberModal = ({
  membersID,
  fetchMembers,
  setMembersID,
  setShowModal,
}: AddMemberModalProps) => {
  const { user: currentUser } = useAppSelector(getUserState);
  const { users, isPending, getUsers, searchUser } = useGetUsers();

  const [searchVal, setSearchVal] = useState<string>("");

  useEffect(() => {
    getUsers(currentUser.uid);
  }, []);

  const isMember = (userID: string) => membersID.includes(userID);

  const getIsMemberBtnClass = (userID: string) => {
    const memberBtnClass =
      "border-black text-black dark:border-white dark:text-white";
    const nonMemberBtnClass =
      "ml-auto bg-black text-white dark:bg-white dark:text-black text-sm p-1 w-16 h-fit rounded-full";

    return isMember(userID) ? memberBtnClass : nonMemberBtnClass;
  };

  const removeMember = (userID: string) =>
    setMembersID((membersID: string[]) =>
      membersID.filter((id) => id !== userID)
    );

  const addMember = (userID: string) =>
    setMembersID((membersID: string[]) => [...membersID, userID]);

  const addMemberClickHandler = (user: User) => {
    isMember(user.uid.toString())
      ? removeMember(user.uid.toString())
      : addMember(user.uid.toString());
  };

  const handleAddMembersBtn = () => {
    fetchMembers();
    setShowModal(false);
  };

  const searchChangeHandler = (e: any) => setSearchVal(e.target.value);

  const searchHandler = async () => {
    searchUser(searchVal);
  };

  useEffect(() => {
    searchHandler();
  }, [searchVal]);

  return (
    <div className="w-72 h-full flex flex-col gap-4">
      <div className="flex gap-1 items-center">
        <TwButton
          variant="transparent"
          onClick={() => setShowModal(false)}
          className="w-fit flex gap-2"
        >
          <AiOutlineArrowLeft className="text-xl" />
        </TwButton>
        <h1 className="text-xl text-black dark:text-white text-center justify-self-center">
          Add Members
        </h1>
      </div>
      <form className="w-full" autoComplete="off">
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

      <ul className="flex flex-col gap-4 h-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
        {users?.length !== 0 &&
          users?.map((user) => (
            <li key={user.uid}>
              <div className="w-full flex items-center gap-4">
                <ProfilePicture
                  isOnline={false}
                  photoURL={user.photoURL}
                  size="small"
                />
                <div className="flex flex-col gap-1 text-left">
                  <p>{user.displayName}</p>
                  <p className="text-muted-light dark:text-muted-dark text-sm ">
                    {user.bio}
                  </p>
                </div>
                <button
                  onClick={() => addMemberClickHandler(user)}
                  className={`${getIsMemberBtnClass(
                    user.uid.toString()
                  )} ml-auto border text-sm p-1 w-16 h-fit rounded-full`}
                >
                  {isMember(user.uid.toString()) ? "added" : "add"}
                </button>
              </div>
            </li>
          ))}
      </ul>
      <TwButton onClick={handleAddMembersBtn} className="mt-2">
        Done
      </TwButton>
    </div>
  );
};

export default AddMemberModal;
