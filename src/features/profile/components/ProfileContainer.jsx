import { useContext, useState } from "react";

import {
  ToastMsgContext,
  UserContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import { GoMention } from "react-icons/go";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

import ProfileEditForm from "./ProfileEditForm";

import { Modal, TwTooltip, TwButton } from "/src/components";

const ProfileContainer = ({ setSideBarContent }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [toastMsg, setToastMsg] = useContext(ToastMsgContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

  const [showModal, setShowModal] = useState(false);

  const infoButtons = [
    { icon: HiOutlineMail, text: userInfo.email },
    { icon: GoMention, text: userInfo.username },
    { icon: HiOutlineLocationMarker, text: userInfo.location },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);

    setToastMsg(`Copied ${text}.`);
  };

  return (
    <div className=" flex flex-col">
      <Modal setShowModal={setShowModal}>
        {showModal && (
          <ProfileEditForm email={userInfo.email} setShowModal={setShowModal} />
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
            alt={`${userInfo.username}'s profile picture`}
            src={userInfo.profile}
          />
          <h2 className="text-lg text-black dark:text-white">
            {userInfo.username}
          </h2>
          <p className="text-muted-light dark:text-muted-dark">
            {userInfo.bio}
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
                onClick={() => copyToClipboard(obj.text)}
                key={obj.text + i}
              >
                <Icon className="text-muted-light dark:text-muted-dark text-2xl" />
                {obj.text}
                <TwTooltip position="top">Copy to clipboard</TwTooltip>
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
