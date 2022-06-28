import React, { useState, useRef, useEffect } from "react";

import Picker from "emoji-picker-react";

import { motion, AnimatePresence } from "framer-motion";

import { IoIosSend } from "react-icons/io";
import { VscSmiley } from "react-icons/vsc";
import { AiOutlineArrowDown } from "react-icons/ai";

const Conversation = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showArrowDown, setShowArrowDown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const conversationContainer = useRef("");
  const latestMsg = useRef("");

  const sendMessage = (event) => {
    event.preventDefault();
    setMessage("");
    setMessages((messages) => [...messages, message]);
    // console.log(latestMsg.current.textContent);
    // console.log(messages);
  };

  const onEmojiClick = (_, emojiObject) => {
    setMessage(message + emojiObject.emoji);
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

  const scrollDown = () => {
    latestMsg.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!latestMsg.current) return;

    latestMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, message]);

  return (
    <div className="h-screen w-screen p-4 flex justify-center">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="bg-white rounded-xl w-full h-20 p-2 px-4 flex items-center mb-auto">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 h-12 w-12 rounded-full"></div>
            <h2 className="text-2xl text-black">Elvis</h2>
          </div>
        </div>
        <main
          ref={conversationContainer}
          className="relative flex flex-col gap-2 overflow-scroll scrollbar-hide"
        >
          {showArrowDown && (
            <motion.div
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              initial={{ opacity: 0, y: 50, x: "-50%" }}
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
          {/* <div className="flex bg-white text-black mr-auto p-2 px-4 w-fit rounded-xl">
            <p className="text-lg">This is a text</p>
          </div> */}
          {messages.map((currentMsg, i) => (
            <motion.div
              key={currentMsg + i}
              animate={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0, opacity: 0 }}
              ref={latestMsg}
              className="flex bg-blue-500 text-white ml-auto p-2 px-4 w-fit rounded-xl"
            >
              <p className="text-lg">{currentMsg}</p>
            </motion.div>
          ))}
        </main>
        <div className="bg-white rounded-xl w-full h-16 p-2 pl-4 flex items-center relative gap-1">
          <AnimatePresence>
            {showEmoji && (
              <motion.div
                key="arrowDown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: "-100%" }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 -translate-y-full"
              >
                <Picker
                  disableSkinTonePicker={true}
                  onEmojiClick={onEmojiClick}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={() => setShowEmoji(!showEmoji)}>
            <VscSmiley className="text-2xl" />
          </button>
          <form
            onSubmit={sendMessage}
            className="w-full flex items-center gap-1"
          >
            <input
              required
              type="text"
              value={message}
              placeholder="Message here"
              className="p-2 px-4 w-full"
              onChange={(e) => setMessage(e.target.value)}
              onBlur={(e) => setMessage(e.target.value)}
            />
            <button className="rounded-xl ml-auto p-2 bg-blue-500 flex items-center justify-center active:scale-90 duration-300 hover:bg-blue-400">
              <IoIosSend className="text-white text-2xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
