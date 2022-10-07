import { useRef, useState } from "react";

import { AiOutlineArrowLeft, AiOutlineCamera } from "react-icons/ai";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

import { useAppDispatch, useAppSelector } from "app/hooks";

import ProfileEditForm from "./ProfileEditForm";

import { Modal, TwTooltip, TwButton } from "components";
import { createToast } from "toastSlice";
import { editProfile, getUserState } from "features/authentication/userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "services/firebase";
import { v4 as uuid } from "uuid";

interface ProfileContainerProps {
  setSideBarContent: (state: string) => void;
}

const ProfileContainer = ({ setSideBarContent }: ProfileContainerProps) => {
  const dispatch = useAppDispatch();

  const imageInputRef = useRef<any>(null);

  const { user } = useAppSelector(getUserState);

  const [showModal, setShowModal] = useState(false);

  const infoButtons = [
    { icon: HiOutlineMail, text: user?.email || "fetching email..." },
    {
      icon: HiOutlineLocationMarker,
      text: user?.location || "fetching location...",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    dispatch(createToast(`Copied ${text}.`));
  };

  const handleImageChange = async (e: any) => {
    try {
      const imageUpload = e.target.files[0];

      if (!imageUpload) return;

      const imageName = `images/${imageUpload.name + uuid()}`;
      const imageRef = ref(storage, imageName);

      await uploadBytes(imageRef, imageUpload).then((snapshot: any) => {
        getDownloadURL(snapshot.ref).then((url: string) => {
          dispatch(editProfile({ photoURL: url }));
          imageInputRef.current.value = "";
          dispatch(createToast("profile picture changed."));
        });
      });
    } catch (error) {
      imageInputRef.current.value = "";
      dispatch(createToast("something went wrong."));
    }
  };

  return (
    <div className=" flex flex-col">
      <Modal setShowModal={setShowModal}>
        {showModal && (
          <ProfileEditForm currentUserInfo={user} setShowModal={setShowModal} />
        )}
      </Modal>

      <div className="flex-col justify-center gap-4 p-6">
        <TwButton
          variant="transparent"
          onClick={() => setSideBarContent("chats")}
          className="w-full flex gap-2"
        >
          <AiOutlineArrowLeft className="text-xl" /> My Profile
        </TwButton>

        <div className="flex flex-col items-center text-center p-4 px-8">
          <div className=" mb-2 group relative flex items-center justify-center ">
            <img
              className="object-cover rounded-[50%] bg-white w-24 h-24 "
              alt={`${user?.displayName}'s profile picture`}
              src={user?.photoURL || ""}
            />
            <label
              htmlFor="photo-change"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 w-fit cursor-pointer invisible group-hover:visible"
            >
              <AiOutlineCamera />
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
          <h2 className="text-lg text-black dark:text-white">
            {user?.displayName || "fetching display name..."}
          </h2>
          <p className="text-muted-light dark:text-muted-dark">
            {user?.bio || "fetching bio..."}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 border-t border-muted-light/10 dark:border-muted-dark/10">
        <div className="flex flex-col gap-1 w-100 ">
          {infoButtons.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <TwButton
                variant="transparent"
                className="relative group"
                onClick={() => copyToClipboard(obj.text as string)}
                key={(obj.text as string) + i}
              >
                <Icon className="text-muted-light dark:text-muted-dark text-2xl" />
                {obj.text}
                <TwTooltip tip="Copy to clipboard" position="top" />
              </TwButton>
            );
          })}

          <TwButton onClick={() => setShowModal(true)} className="mt-2">
            Edit Info
          </TwButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
function setImageStorageName(imageName: string) {
  throw new Error("Function not implemented.");
}
