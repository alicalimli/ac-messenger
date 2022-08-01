import { useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { UserContext } from "/src/setup/app-context-manager";

const Messages = ({ messages, latestMsgRef }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  return messages.map((currentMsg, i) => (
    <div
      key={currentMsg + i}
      className={`group gap-2 py-1 flex ${
        currentMsg.username === userInfo.email ? "flex-row-reverse" : ""
      }`}
    >
      <motion.button
        animate={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0, opacity: 0 }}
        ref={latestMsgRef}
        className={`
              peer flex rounded-full p-1.5 px-3 w-fit
              ${
                currentMsg.username === userInfo.email
                  ? "focus:bg-primary-tinted  bg-primary-main text-white rounded-br-sm"
                  : "bg-white text-black rounded-bl-sm"
              }
            `}
      >
        <p className="text-md">{currentMsg.msg}</p>
      </motion.button>
      <div className="opacity-0 peer-focus:opacity-100 group-hover:opacity-100 duration-300">
        <time className="ml-auto text-sm text-slate-500">{"12:33"}</time>
      </div>
    </div>
  ));
};

export default Messages;
