import { useContext, useEffect, useState } from "react";

import {
  ToastMsgContext,
  UserContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import { GoMention } from "react-icons/go";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

import {
  InputForm,
  Modal,
  TwButton,
  TwTooltip,
  TwTrnButton,
} from "/src/components";

import { useEditInfo } from "../hooks";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const ProfileContainer = ({ previousContentRef, setSideBarContent }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [toastMsg, setToastMsg] = useContext(ToastMsgContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");

  const { editInfo, errorMsg, setErrorMsg, pendingMsg } = useEditInfo();

  const infoButtons = [
    { icon: HiOutlineMail, text: userInfo.email },
    { icon: GoMention, text: userInfo.username },
    { icon: HiOutlineLocationMarker, text: "fatsa" },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);

    setToastMsg(`Copied ${text}.`);
  };

  const handleChangeInfo = async (e) => {
    try {
      e.preventDefault();

      if (!validUsername) return;

      await editInfo(userInfo.email, username, password);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    console.log(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  return (
    <div className=" flex flex-col">
      <Modal setShowModal={setShowModal}>
        {showModal && (
          <form
            onSubmit={handleChangeInfo}
            className="flex flex-col gap-2 w-96"
          >
            <h2 className="text-black dark:text-white text-xl text-center">
              Edit Information
            </h2>
            <p
              className={`text-red-600 text-md text-center ${
                errorMsg ? "visible block" : "absolute invisible"
              }`}
            >
              {errorMsg}
            </p>

            <InputForm
              label="Username"
              type="text"
              state={username}
              setState={setUsername}
              stateFocus={usernameFocus}
              setStateFocus={setUsernameFocus}
              placeHolder="e.g example123"
              isValid={validUsername}
              instruction="Must be 4 to 24 characters and begins with a letter. Hyphen and underscore are allowed"
            />
            <InputForm
              label="Current Password"
              type="password"
              state={password}
              setState={setPassword}
              placeHolder="*********"
            />
            <TwButton
              isDisabled={validUsername && !pendingMsg ? false : true}
              addClass="mt-4"
            >
              {pendingMsg ? pendingMsg : "Save"}
            </TwButton>
          </form>
        )}
      </Modal>

      <div className="flex-col justify-center gap-4 p-6">
        <TwTrnButton
          clickHandler={() => setSideBarContent(previousContentRef.current)}
          addClass="w-full"
        >{`< My Profile`}</TwTrnButton>

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
            Front-end Developer
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 border-t border-muted-light/10 dark:border-muted-dark/10">
        <p className="text-muted-light dark:text-muted-dark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <div className="flex flex-col gap-1 w-100 ">
          {infoButtons.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <TwTrnButton
                addClass="relative group"
                clickHandler={() => copyToClipboard(obj.text)}
                key={obj.text + i}
              >
                <Icon className="text-muted-light dark:text-muted-dark text-2xl" />
                {obj.text}
                <TwTooltip position="top">Copy to clipboard</TwTooltip>
              </TwTrnButton>
            );
          })}

          <TwButton clickHandler={() => setShowModal(true)} addClass="mt-2">
            Edit Info
          </TwButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
