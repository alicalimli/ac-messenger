import { SyntheticEvent, useEffect, useRef, useState } from "react";

import { AiOutlineArrowDown } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { TwButton } from "components";

import Messages from "./Messages";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import { User } from "interfaces";

interface ChatBoxProps {
  recipient: User;
}

const ChatBox = ({ recipient }: ChatBoxProps) => {
  const [showArrowDown, setShowArrowDown] = useState(false);

  const conversationContainer = useRef<HTMLDivElement>(null);
  const latestMsg = useRef<HTMLButtonElement>(null);

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

  console.log(recipient);

  const scrollDown = () => {
    latestMsg?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const chatBoxScrollHandler = (event: SyntheticEvent) => {
    const target = event.currentTarget;
    if (target.scrollHeight - target.scrollTop > target.clientHeight + 300) {
      setShowArrowDown(true);
    } else {
      setShowArrowDown(false);
    }
  };

  useEffect(() => {
    if (!latestMsg.current) return;
    latestMsg.current.scrollIntoView();
  }, [messages, latestMsg.current]);

  return (
    <section className="flex h-full w-full">
      <div className="w-full flex flex-col gap-4">
        <ChatHeader recipient={recipient} />

        <main
          ref={conversationContainer}
          onScroll={chatBoxScrollHandler}
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
                <TwButton onClick={scrollDown} className="rounded-full px-2">
                  <AiOutlineArrowDown className="text-xl text-white " />
                </TwButton>
              </motion.div>
            )}
          </AnimatePresence>

          <ChatForm setMessages={setMessages} />
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
