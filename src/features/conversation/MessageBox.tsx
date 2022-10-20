import { getUserState } from "features/authentication/userSlice";
import { motion } from "framer-motion";
import { useAppSelector, useGetUser } from "hooks";
import { Message, User } from "interfaces";
import { useFormatDate } from "hooks";
import React, { memo, useEffect, useRef, useState } from "react";
import { ProfilePicture, SharedLayout, TwTooltip } from "components";
import { VARIANTS_MANAGER } from "setup/variants-manager";
import { getChatState } from "features/inbox/chatReducer";
import {
  BsFillTrashFill,
  BsPen,
  BsPencilFill,
  BsPenFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import useSendMessage from "./useSendMessage";
import { current } from "@reduxjs/toolkit";

interface MessageBoxProps {
  currentMsg: Message;
  latestMsgRef: React.Ref<HTMLButtonElement> | any;
}

const MessageBox = ({ currentMsg, latestMsgRef }: MessageBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [msgDate, setMsgDate] = useState("");

  const [editedMsg, setEditedMsg] = useState<string>(currentMsg.message);
  const [senderData, setSenderData] = useState<User>();

  const { user: currentUser } = useAppSelector(getUserState);
  const { isGroup } = useAppSelector(getChatState);

  const getUserInfo = useGetUser();
  const formatDate = useFormatDate();

  const { deleteMsg, editMsg } = useSendMessage();

  const isCurrentUser = currentMsg.senderId === currentUser.uid;

  const deleteBtnHandler = (msg: Message) => {
    deleteMsg(msg);
  };

  const editBtnHandler = (msg: Message) => {
    setIsEditing(true);
  };

  const editedMsgSubmitHandler = (e: React.FormEvent, msg: Message) => {
    e.preventDefault();

    if (!editedMsg) return;

    setIsEditing(false);
    editMsg(msg, editedMsg);
  };

  useEffect(() => {
    getUserInfo(currentMsg.senderId).then((senderData) => {
      const date = formatDate(currentMsg.date.toDate());
      setMsgDate(date as string);
      setSenderData(senderData);
    });
  }, []);

  return (
    <motion.div
      variants={VARIANTS_MANAGER}
      initial="fade-out"
      animate="fade-in"
      className={`group gap-2 py-1 flex  ${
        isCurrentUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex flex-col gap-0.5 ${
          isCurrentUser ? "items-end" : "items-start"
        }`}
      >
        {currentMsg.img ? (
          <motion.img
            src={currentMsg.img}
            layoutId={`${currentMsg.id}`}
            ref={latestMsgRef}
            onClick={() => {
              setIsExpanded(true);
            }}
            className={`${
              isExpanded && "invisible"
            }  sm:w-64 bg-muted-dark/10 rounded-xl cursor-pointer`}
          />
        ) : (
          ""
        )}

        {currentMsg.img && (
          <SharedLayout
            isExpanded={isExpanded}
            onClick={() => {
              setIsExpanded(false);
            }}
          >
            {isExpanded && (
              <motion.img
                src={currentMsg.img}
                layoutId={`${currentMsg.id}`}
                className="w-96 cursor-pointer  bg-muted-dark/10 rounded-xl"
              />
            )}
          </SharedLayout>
        )}

        {currentMsg.message && (
          <div
            className={`flex gap-2 items-end ${
              isCurrentUser ? "flex-row-reverse" : ""
            }`}
          >
            {isGroup && (
              <ProfilePicture
                size="small"
                isOnline={false}
                photoURL={senderData?.photoURL}
              />
            )}
            {isEditing ? (
              <form
                onSubmit={(e: React.FormEvent) =>
                  editedMsgSubmitHandler(e, currentMsg)
                }
              >
                <input
                  type="text"
                  value={editedMsg}
                  className="bg-primary-main text-white rounded-br-sm flex rounded-3xl py-1.5 px-3 break-all text-md max-w-xs w-auto h-fit text-start"
                  onChange={(e) => setEditedMsg(e.target.value)}
                />
              </form>
            ) : (
              <button
                ref={latestMsgRef}
                className={`
              peer flex rounded-3xl py-1.5 px-3 break-all text-md max-w-xs w-fit h-fit text-start
              ${
                isCurrentUser
                  ? "focus:bg-primary-tinted  bg-primary-main text-white rounded-br-sm"
                  : "bg-white text-black rounded-bl-sm"
              }
            `}
              >
                {currentMsg.message}
              </button>
            )}
            {isCurrentUser && (
              <div className="flex translate-y-1/4 invisible group-hover:visible  rounded-full dark:bg-bgmain-dark shadow-md overflow-hidden ">
                <button
                  onClick={() => deleteBtnHandler(currentMsg)}
                  className="relative group dark:text-muted-dark
                  text-muted-light p-2 hover:bg-muted-light/10 dark:hover:bg-muted-light flex justify-center items-center"
                >
                  <BsFillTrashFill className="" />
                </button>
                <button
                  onClick={() => editBtnHandler(currentMsg)}
                  className="relative group dark:text-muted-dark
                  text-muted-light p-2  hover:bg-muted-light/10 dark:hover:bg-muted-light flex justify-center items-center"
                >
                  <BsPencilFill className="" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-1 items-center text-black dark:text-white">
          {isGroup && !isCurrentUser && (
            <>
              <p
                className={`${
                  isCurrentUser ? "text-end" : "text-start"
                } text-xs `}
              >
                {senderData?.displayName}
              </p>

              <span> • </span>
            </>
          )}
          <time className="ml-auto text-xs">{msgDate}</time>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(MessageBox);
