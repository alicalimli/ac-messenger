import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Messages = ({ messages, latestMsgRef }) => {
  return messages.map((currentMsg, i) => (
        <div
        key={currentMsg + i}
          className={`group gap-2 py-1 flex ${
            currentMsg.user ? "flex-row-reverse" : ""
          }`}
        >
          <motion.button
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0, opacity: 0 }}
            ref={latestMsgRef}
            className={`
              peer flex rounded-full p-1.5 px-3 w-fit
              ${
                currentMsg.user
                  ? "focus:bg-primary-tinted  bg-primary-main text-white rounded-br-sm"
                  : "bg-white text-black rounded-bl-sm"
              }
            `}
          >
            <p className="text-md">{currentMsg.message}</p>
          </motion.button>
          <div className="opacity-0 peer-focus:opacity-100 group-hover:opacity-100 duration-300">
            <time className="ml-auto text-sm text-slate-500">
              {currentMsg.time}
            </time>
          </div>
        </div>
      )
  );
};

export default Messages;
