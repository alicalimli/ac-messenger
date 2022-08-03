import { TwTrnButton } from "/src/components";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useGetUsers } from '/src/hooks'

const AddContacts = ({ setSideBarContent }) => {
  const users = useGetUsers();

  return (
    <section className="flex flex-col items-center p-4 px-8">
        <TwTrnButton
          clickHandler={() => setSideBarContent("chats")}
          addClass="w-full flex gap-2"
        ><AiOutlineArrowLeft className="text-lg" /> Add Contacts</TwTrnButton>
        {users.map((user) => (
           <TwTrnButton addClass="w-full flex gap-4">
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
