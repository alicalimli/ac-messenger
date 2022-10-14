import { Modal, ProfilePicture, TwButton } from "components";
import { User } from "interfaces";
import { doc, getDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineCamera } from "react-icons/ai";
import { MdPersonAdd } from "react-icons/md";
import { db } from "setup/firebase";
import AddMemberModal from "./AddMemberModal";

interface SettingsContainerProps {
  setSideBarContent: (state: string) => void;
}

const NewGroupContainer = ({ setSideBarContent }: SettingsContainerProps) => {
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState<User[]>([]);
  const [membersID, setMembersID] = useState<string[]>([]);

  const imageInputRef = useRef<any>(null);

  const handleImageChange = () => {
    console.log("");
  };

  const fetchMembers = async () => {
    membersID.forEach(async (id) => {
      const isRendered = members.find((member) => member.uid.toString() === id)
        ? true
        : false;

      if (isRendered) return;

      const userDocRef = doc(db, "users", id);
      const userData = (await getDoc(userDocRef)).data();
      setMembers((members) => [...members, userData]);
    });
    console.log(members);
  };

  const handleRemoveMember = (userID: string) => {
    const newMembers = members.filter(
      (member) => member.uid.toString() !== userID
    );
    const newMembersID = membersID.filter((id) => id !== userID);

    setMembers(newMembers);
    setMembersID(newMembersID);
  };

  return (
    <div className="flex-col justify-center gap-4 p-1 py-6 sm:p-6">
      <Modal setShowModal={setShowModal} className="h-3/4 ">
        {showModal && (
          <AddMemberModal
            membersID={membersID}
            fetchMembers={fetchMembers}
            setMembersID={setMembersID}
            setShowModal={setShowModal}
          />
        )}
      </Modal>

      <header>
        <TwButton
          variant="transparent"
          onClick={() => setSideBarContent("chats")}
          className="w-full flex gap-2"
        >
          <AiOutlineArrowLeft className="text-xl" />
          Cancel
        </TwButton>
      </header>

      <main className="flex-col justify-center gap-4 p-6">
        <div className="flex flex-col items-center text-center p-4 px-8">
          <div className="group mb-2 relative flex items-center justify-center rounded-[50%] overflow-hidden">
            <img className="object-cover rounded-[50%] bg-white w-24 h-24 " />
            <label
              htmlFor="photo-change"
              className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 cursor-pointer invisible group-hover:visible w-full h-full"
            >
              <AiOutlineCamera className="text-3xl" />
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="photo-change"
                className="invisible hidden"
              />
            </label>
          </div>
          <h2 className="text-lg text-black dark:text-white">{"group name"}</h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <h1 className="text-black dark:text-white text-lg">{`Members (${members?.length})`}</h1>
            <div className="ml-auto flex gap-1">
              {" "}
              <TwButton
                variant="transparent"
                className="relative group z-10 py-3 px-3"
                onClick={() => setShowModal(true)}
              >
                <MdPersonAdd className="text-muted-light dark:text-muted-dark text-2xl" />
              </TwButton>
            </div>
          </div>

          <ul className="flex flex-col gap-4">
            {members.length !== 0 &&
              members.map((member) => (
                <li key={member.uid} className="w-full flex items-center gap-4">
                  <ProfilePicture
                    isOnline={false}
                    photoURL={member.photoURL}
                    size="small"
                  />
                  <div className="flex flex-col gap-1 text-left">
                    <p className="text-black dark:text-white">
                      {member.displayName}
                    </p>
                    <p className="text-muted-light dark:text-muted-dark text-sm ">
                      {member.bio}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.uid.toString())}
                    className={`ml-auto bg-red-600 text-white text-sm p-1 px-2 w-16 h-fit rounded-full`}
                  >
                    remove
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default NewGroupContainer;
