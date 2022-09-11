import { useEffect, useRef, useState } from "react";

import { AiOutlineArrowDown } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { TwButton } from "/src/components";

import Messages from "./Messages";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";

const ChatBox = ({ currentChat, setCurrentChat }) => {
  const [showArrowDown, setShowArrowDown] = useState(false);

  const conversationContainer = useRef("");
  const latestMsg = useRef("");

  const [messages, setMessages] = useState([
    {
      username: "ali",
      message: "Hey",
      time: "10:22",
    },
    {
      username: "ali",
      message: "Hello",
      time: "10:22",
    },
    {
      username: "ali",
      message: "Test",
      time: "10:22",
    },
  ]);

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
    <section className="flex h-full w-full">
      <div className="w-full flex flex-col gap-4">
        <ChatHeader />

        <main
          ref={conversationContainer}
          className="relative flex flex-col overflow-scroll scrollbar-hide px-4"
        >
          <Messages messages={messages} latestMsgRef={latestMsg} />
        </main>

        <div className="w-full flex items-center relative gap-2 p-4 pt-0">
          <AnimatePresence>
            {showArrowDown && (
              <motion.div
                animate={{ opacity: 1, x: -50 }}
                initial={{ opacity: 0, x: -50 }}
                exit={{ opacity: 0, x: -50 }}
                className="absolute -top-3/4 left-1/2 z-10"
              >
                <TwButton
                  clickHandler={scrollDown}
                  addClass="rounded-full px-2"
                >
                  <AiOutlineArrowDown className="text-xl text-white " />
                </TwButton>
              </motion.div>
            )}
          </AnimatePresence>

          <ChatForm messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
