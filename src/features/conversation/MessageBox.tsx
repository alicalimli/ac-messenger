import { getUserState } from "features/authentication/userSlice";
import { motion } from "framer-motion";
import { useAppSelector } from "app/hooks";
import { Message } from "interfaces";
import { useFormatDate } from "hooks";
import { useState } from "react";
import { SharedLayout } from "components";

interface MessageBoxProps {
  currentMsg: Message;
  latestMsgRef: React.Ref<HTMLButtonElement> | any;
}

const MessageBox = ({ currentMsg, latestMsgRef }: MessageBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user: currentUser } = useAppSelector(getUserState);

  const formattedDate = useFormatDate(currentMsg.date.toDate());

  return (
    <div
      className={`group gap-2 py-1 flex ${
        currentMsg.senderId === currentUser.uid ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex flex-col gap-1 ${
          currentMsg.senderId === currentUser.uid ? "items-end" : "items-start"
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
            } w-64 bg-muted-dark/10 rounded-xl cursor-pointer`}
          />
        ) : (
          ""
        )}

        <SharedLayout
          isExpanded={isExpanded}
          onClick={() => {
            setIsExpanded(false);
          }}
        >
          {currentMsg.img && isExpanded ? (
            <motion.img
              src={currentMsg.img}
              layoutId={`${currentMsg.id}`}
              className="w-96 cursor-pointer  bg-muted-dark/10 rounded-xl"
            />
          ) : (
            ""
          )}
        </SharedLayout>

        {currentMsg.message && (
          <div
            className={`flex gap-2 ${
              currentMsg.senderId === currentUser.uid ? "flex-row-reverse" : ""
            }`}
          >
            <motion.button
              ref={latestMsgRef}
              className={`
              peer flex rounded-full p-1.5 px-3 w-fit
              ${
                currentMsg.senderId === currentUser.uid
                  ? "focus:bg-primary-tinted  bg-primary-main text-white rounded-br-sm"
                  : "bg-white text-black rounded-bl-sm"
              }
            `}
            >
              {currentMsg.message && (
                <p className="text-md">{currentMsg.message}</p>
              )}
            </motion.button>
            <div className="opacity-0 peer-focus:opacity-100 group-hover:opacity-100 duration-300">
              <time className="ml-auto text-sm text-slate-500">
                {formattedDate}
              </time>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
