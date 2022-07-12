import { useContext,useState } from "react";

import {
  UserContext,
  UserTokenContext,
} from "/src/setup/user-context-provider";

import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { GoMention } from "react-icons/go";

import { Modal, TwButton, TwTrnButton, Toast} from "/src/common/components";

const Profile = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  const [toastMsg, setToastMsg] = useState('')

  const infoButtons = [
    { icon: HiOutlineMail, text: userInfo.email },
    { icon: GoMention, text: userInfo.username },
    { icon: HiOutlineLocationMarker, text: "fatsa" },
  ];

  const copyToClipboard = (e) => {
    const btn = e.target.closest('button')
    const text = btn.textContent

    navigator.clipboard.writeText(text);

    setToastMsg(`Copied ${text}.`)
  }

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col">
      <Toast durationMs='5000' msg={toastMsg} setMsg={setToastMsg} />

      <div className="flex-col justify-center gap-4 p-6">
        <h1 className="text-xl text-black dark:text-white">My Profile</h1>
        <div className="flex flex-col items-center text-center p-4 px-8">
          <img
            className="w-full bg-cover bg-center bg-primary-main mb-4 w-16 h-16 rounded-full border border-4 border-white dark:border-black"
            alt={`${userInfo.username}'s profile picture`}
            src={userInfo.profile}
          />
          <h2 className="text-lg text-black dark:text-white">
            {userInfo.username}
          </h2>
          <p className="text-muted-light dark:text-muted-dark">
            Front-end Developer
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 border-t border-muted-light/10 dark:border-muted-dark/10">
        <p className="text-muted-light dark:text-muted-dark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex flex-col gap-1 w-100 ">
          {infoButtons.map((obj) => {
            const Icon = obj.icon;
            return (
              <TwTrnButton clickHandler={copyToClipboard} key={obj.text}>
                <Icon className="text-muted-light dark:text-muted-dark text-2xl" />
                {obj.text}
              </TwTrnButton>
            );
          })}

          <TwButton addClass="mt-2">Edit Info</TwButton>
        </div>
      </div>
    </div>
  );
};

export default Profile;
