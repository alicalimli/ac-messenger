import { ProfilePicture, TwButton } from "components";
import { useGetUsers } from "hooks";
import { User } from "interfaces";
import { useEffect, useState } from "react";

interface AddMemberModalProps {
  aa: string;
}

const AddMemberModal = () => {
  const [users, setUsers] = useState<User[]>();
  const { getUsers, searchUser } = useGetUsers();

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div className="w-72 h-full flex flex-col gap-4">
      <h1 className="text-xl text-black dark:text-white text-center">
        Add Members
      </h1>
      <ul className="flex flex-col gap-4 h-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
        {users?.length !== 0 &&
          users?.map((user) => (
            <li>
              <div key={user.uid} className="w-full flex items-center gap-4">
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
                <button className="ml-auto bg-black text-white dark:bg-white dark:text-black text-sm p-1 w-16 h-fit rounded-full">
                  Add
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AddMemberModal;
