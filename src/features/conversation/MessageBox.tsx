import { getUserState } from "features/authentication/userSlice";
import { motion } from "framer-motion";
import { useAppSelector, useGetUser } from "hooks";
import { Message, User } from "interfaces";
import { useFormatDate } from "hooks";
import { memo, useEffect, useState } from "react";
import { ProfilePicture, SharedLayout } from "components";
import { VARIANTS_MANAGER } from "setup/variants-manager";
import { getChatState } from "features/inbox/chatReducer";

interface MessageBoxProps {
  currentMsg: Message;
  latestMsgRef: React.Ref<HTMLButtonElement> | any;
}

const MessageBox = ({ currentMsg, latestMsgRef }: MessageBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [senderData, setSenderData] = useState<User>();
  const [msgDate, setMsgDate] = useState("");

  const { user: currentUser } = useAppSelector(getUserState);
  const { isGroup } = useAppSelector(getChatState);

  const getUserInfo = useGetUser();
  const formatDate = useFormatDate();

  const isCurrentUser = currentMsg.senderId === currentUser.uid;

  useEffect(() => {
    if (!isGroup) return;

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
        className={`flex flex-col gap-1 ${
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

            <div
              className={`flex flex-col gap-0.5 ${
                isCurrentUser ? "items-end " : "items-start"
              }`}
            >
              {!isCurrentUser && (
                <p
                  className={`${
                    isCurrentUser ? "text-end" : "text-start"
                  } text-xs dark:text-muted-dark text-muted-light`}
                >
                  {senderData?.displayName}
                </p>
              )}
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
            </div>
            <div className="opacity-0 peer-focus:opacity-100 group-hover:opacity-100 duration-300">
              <time className="ml-auto text-sm text-slate-500">{msgDate}</time>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(MessageBox);
