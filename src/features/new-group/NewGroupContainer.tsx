import {
  InputForm,
  Modal,
  ProfilePicture,
  TwButton,
  TwTooltip,
} from "components";
import { User } from "interfaces";
import { doc, getDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineCamera } from "react-icons/ai";
import { MdPersonAdd } from "react-icons/md";
import { db, storage } from "setup/firebase";
import AddMemberModal from "./AddMemberModal";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { createToast } from "toastSlice";
import { useAppDispatch } from "hooks";
import { v4 as uuid } from "uuid";

interface SettingsContainerProps {
  setSideBarContent: (state: string) => void;
}

const NewGroupContainer = ({ setSideBarContent }: SettingsContainerProps) => {
  const [members, setMembers] = useState<User[]>([]);
  const [membersID, setMembersID] = useState<string[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [imageStorageName, setImageStorageName] = useState<string>("");

  const [groupName, setGroupName] = useState("");

  const imageInputRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const handleImageChange = async (e: any) => {
    try {
      const imageUpload = e.target.files[0];

      if (!imageUpload) return;

      const imageName = `images/${imageUpload.name + uuid()}`;
      const imageRef = ref(storage, imageName);

      setImageStorageName(imageName);

      await uploadBytes(imageRef, imageUpload).then((snapshot: any) => {
        getDownloadURL(snapshot.ref).then((url: string) => {
          imageInputRef.current.value = "";
          setImgURL(url);
          dispatch(createToast("profile picture changed."));
        });
      });
    } catch (error) {
      imageInputRef.current.value = "";
      dispatch(createToast("something went wrong."));
    }
  };

  const fetchMembers = async () => {
    membersID.forEach(async (id) => {
      const isRendered = members.find((member) => member.uid.toString() === id)
        ? true
        : false;

      if (isRendered) return;

      const userDocRef = doc(db, "users", id);
      const userData = (await getDoc(userDocRef)).data();
      setMembers((members) => [...members, userData] as User[]);
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

  const groupNameChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const cancelBtnHandler = () => {
    const imageRef = ref(storage, imageStorageName);
    deleteObject(imageRef);
    setImageStorageName("");
    setSideBarContent("chats");
  };

  return (
    <div className="flex-col justify-center gap-4 p-4 py-6 sm:p-6 h-full">
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
          onClick={cancelBtnHandler}
          className="w-full flex gap-2"
        >
          <AiOutlineArrowLeft className="text-xl" />
          Cancel
        </TwButton>
      </header>

      <div className="flex flex-col items-center text-center p-4 px-8">
        <div className="group mb-2 relative flex items-center justify-center rounded-[50%] overflow-hidden">
          <img
            src={imgURL}
            className="object-cover rounded-[50%] bg-white w-24 h-24 "
          />
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

        <form onSubmit={groupNameChangeHandler}>
          <InputForm
            className="w-44 text-lg p-0.5"
            state={groupName}
            maxLength={30}
            setState={setGroupName}
            type={"text"}
            placeholder={"Group Name"}
          />
        </form>
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

        <TwButton onClick={""} className="mt-2">
          Create Group
        </TwButton>
      </div>
    </div>
  );
};

export default NewGroupContainer;
