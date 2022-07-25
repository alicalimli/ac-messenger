import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineArrowDown } from "react-icons/ai";

const Messages = ({ messages }) => {
  const [showArrowDown, setShowArrowDown] = useState(false);
  const conversationContainer = useRef("");
  const latestMsg = useRef("");

  const scrollDown = () => {
    latestMsg.current.scrollIntoView({ behavior: "smooth" });
  };

  if (conversationContainer.current) {
    conversationContainer.current.addEventListener("scroll", (event) => {
      const target = event.target;
      if (target.scrollHeight - target.scrollTop > target.clientHeight + 300) {
        setShowArrowDown(true);
      } else {
        setShowArrowDown(false);
      }
    });
  }

  useEffect(() => {
    if (!latestMsg.current) return;
    latestMsg.current.scrollIntoView();
  }, [messages, latestMsg.current]);

  return (
    <main
      ref={conversationContainer}
      className="relative flex flex-col overflow-scroll scrollbar-hide px-4"
    >
      <AnimatePresence>
        {showArrowDown && (
          <motion.div
            animate={{ opacity: 1}}
            initial={{ opacity: 0}}
            exit={{ opacity: 0}}
            className="sticky "
          >
            <button
              onClick={scrollDown}
              className="cursor-pointer bg-primary-main rounded-full p-2"
            >
              <AiOutlineArrowDown className="text-xl text-white " />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {messages.map((currentMsg, i) => (
        <div
          className={`group gap-2 py-1 flex ${
            currentMsg.user ? "flex-row-reverse" : ""
          }`}
        >
          <motion.button
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0, opacity: 0 }}
            ref={latestMsg}
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
      ))}
    </main>
  );
};

export default Messages;
