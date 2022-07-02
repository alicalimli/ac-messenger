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
      className="relative flex flex-col gap-2 overflow-scroll scrollbar-hide"
    >
      <AnimatePresence>
        {showArrowDown && (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: "0%", x: "-50%" }}
            initial={{ opacity: 0, scale: 0, y: "50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0, y: "50%", x: "-50%" }}
            className="fixed bottom-[12%] left-1/2 -translate-x-1/2"
          >
            <button
              onClick={scrollDown}
              className="cursor-pointer bg-blue-500 rounded-xl p-2"
            >
              <AiOutlineArrowDown className="text-xl text-white " />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {messages.map((currentMsg, i) => (
        <motion.div
          key={currentMsg + i}
          animate={{ scale: 1, x: "0%", opacity: 1 }}
          initial={{ scale: 0, x: "100%", opacity: 0 }}
          ref={latestMsg}
          className={
            currentMsg.user
              ? "flex bg-blue-500 text-white ml-auto p-2 px-4 w-fit rounded-xl"
              : "flex bg-white text-black mr-auto p-2 px-4 w-fit rounded-xl"
          }
        >
          <p className="text-lg">{currentMsg.message}</p>
        </motion.div>
      ))}
    </main>
  );
};

export default Messages;
