import { useState } from "react";

import { GoMention } from "react-icons/go";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

import { useAppDispatch, useAppSelector } from "app/hooks";

import ProfileEditForm from "./ProfileEditForm";

import { Modal, TwTooltip, TwButton } from "components";
import { createToast } from "toastSlice";

interface ProfileContainerProps {
  setSideBarContent: (state: string) => void;
}

const ProfileContainer = ({ setSideBarContent }: ProfileContainerProps) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: any) => state.user.value);

  const [showModal, setShowModal] = useState(false);

  const infoButtons = [
    { icon: HiOutlineMail, text: user.email },
    { icon: GoMention, text: user.username },
    { icon: HiOutlineLocationMarker, text: user.location },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    dispatch(createToast(`Copied ${text}.`));
  };

  return (
    <div className=" flex flex-col">
      <Modal setShowModal={setShowModal}>
        {showModal && (
          <ProfileEditForm email={user.email} setShowModal={setShowModal} />
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
          <img
            className="bg-cover bg-center bg-transparent mb-2 w-24 h-24 rounded-full shadow-md"
            alt={`${user.username}'s profile picture`}
            src={user.profile}
          />
          <h2 className="text-lg text-black dark:text-white">
            {user.username}
          </h2>
          <p className="text-muted-light dark:text-muted-dark">{user.bio}</p>
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
                onClick={() => copyToClipboard(obj.text)}
                key={obj.text + i}
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
