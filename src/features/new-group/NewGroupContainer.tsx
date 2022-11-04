import {
  InputForm,
  LoadingSpinner,
  Modal,
  ProfilePicture,
  TwButton,
} from "components";
import { User } from "interfaces";
import { doc, getDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineCamera } from "react-icons/ai";
import { MdPersonAdd } from "react-icons/md";
import { db } from "setup/firebase";
import AddMemberModal from "./AddMemberModal";
import { getUserState } from "features/authentication/userSlice";
import { createToast } from "toastSlice";
import { useAppDispatch, useAppSelector, useUploadImage } from "hooks";
import { changeSideContent } from "reducers/sideContentReducer";
import useCreateGroup from "./useCreateGroup";
import { BiPlus } from "react-icons/bi";

const NewGroupContainer = () => {
  const { user: currentUser } = useAppSelector(getUserState);

  const [members, setMembers] = useState<User[]>([]);
  const [membersID, setMembersID] = useState<string[]>([]);
  const [membersPending, setMembersPending] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [groupName, setGroupName] = useState("");

  const { createGroup, isPending, errorMsg } = useCreateGroup();

  const imageInputRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const { uploadImg, removeUploadImg, imgURL, isImgPending } = useUploadImage();

  const handleImageChange = async (e: any) => {
    const imageFile = e.target.files[0];

    const uploadImgArgs = {
      imageFile,
      imageInputRef,
    };

    await uploadImg(uploadImgArgs);

    dispatch(createToast("Image successfully changed."));
  };

  const fetchMembers = async () => {
    try {
      setMembersPending(true);
      setMembers([]);

      membersID.forEach(async (id) => {
        const userDocRef = doc(db, "users", id);
        const userData = (await getDoc(userDocRef)).data();
        setMembers((members) => [...members, userData] as User[]);
        setMembersPending(false);
      });
    } catch (error: any) {
      setMembersPending(false);
      console.error(error.message);
    }
  };

  const handleRemoveMember = (userID: string) => {
    const newMembers = members.filter((member) => member.uid !== userID);
    const newMembersID = membersID.filter((id) => id !== userID);

    setMembers(newMembers);
    setMembersID(newMembersID);
  };

  const createGroupBtnHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (members.length < 2) {
      dispatch(createToast("Must have atleast 2 members."));
      return;
    }

    if (!imgURL) {
      dispatch(createToast("Must have an image."));
      return;
    }

    if (groupName.length < 3) {
      dispatch(createToast("Name must have atleast 3 characters."));
      return;
    }

    const groupInfo = {
      ownerUID: currentUser.uid,
      groupName,
      membersID,
      photoURL: imgURL,
    };

    createGroup(groupInfo);
  };

  const cancelBtnHandler = () => {
    removeUploadImg();
    dispatch(changeSideContent({ content: "chats" }));
  };

  return (
    <aside className="flex-col justify-center gap-4 p-4 py-6 sm:p-6 h-full">
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

      <main>
        <section className="flex gap-4 items-center text-center p-2 mt-2">
          <div className="group mb-2 relative flex items-center justify-center rounded-[50%] overflow-hidden ">
            {imgURL ? (
              <img
                src={imgURL}
                className="object-cover rounded-[50%] bg-white w-20 h-20 "
              />
            ) : (
              <div className="rounded-[50%] bg-primary-main w-20 h-20 flex justify-center items-center ">
                <AiOutlineCamera className="text-3xl text-white font-bold" />
              </div>
            )}
            {isImgPending && (
              <LoadingSpinner
                className="w-full h-full bg-black/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                msg={""}
              />
            )}
            <label
              htmlFor="photo-change"
              className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 cursor-pointer invisible group-hover:visible w-full h-full"
            >
              <AiOutlineCamera className="text-3xl" />
              <input
                ref={imageInputRef}
                type="file"
                disabled={isImgPending ? true : false}
                accept="image/*"
                onChange={handleImageChange}
                id="photo-change"
                className="invisible hidden"
              />
            </label>
          </div>
          <InputForm
            className="w-44 p-0.5"
            variant="underline"
            state={groupName}
            maxLength={30}
            setState={setGroupName}
            type={"text"}
            placeholder={"Group Name"}
          />
        </section>

        <section className="flex flex-col gap-1 border-t border-main">
          <div className="flex items-center gap-1">
            <h1 className="text text-lg">{`Members (${members?.length})`}</h1>
            <div className="ml-auto flex gap-1">
              {" "}
              <TwButton
                variant="transparent"
                className="relative group z-10 py-3 px-3"
                onClick={() => setShowModal(true)}
              >
                <MdPersonAdd className="text-muted text-2xl" />
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
                    <p className="text">{member.displayName}</p>
                    <p className="text-muted text-sm ">{member.bio}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveMember(member.uid)}
                    className={`ml-auto bg-red-600 duration-300 hover:bg-red-500 active:scale-95 text-white text-sm p-1 px-3 h-fit rounded-full`}
                  >
                    remove
                  </button>
                </li>
              ))}
          </ul>

          <TwButton
            disabled={isPending ? true : false}
            onClick={createGroupBtnHandler}
            className="mt-2"
          >
            {isPending ? "Creating Group..." : "Create Group"}
          </TwButton>
        </section>
      </main>
    </aside>
  );
};

export default NewGroupContainer;
