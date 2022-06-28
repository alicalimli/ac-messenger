import React, { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { MdSend } from "react-icons/md";
import { VscSmiley } from "react-icons/vsc";
import { BiMicrophone } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { AiOutlineArrowDown } from "react-icons/ai";

const ChatBox = () => {
  const [showArrowDown, setShowArrowDown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const conversationContainer = useRef("");
  const latestMsg = useRef("");

  const sendMessage = (event) => {
    event.preventDefault();
    setMessage("");
    setMessages((messages) => [...messages, message]);
    // console.log(latestMsg.current.textContent) // console.log(messages);
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
            <div className="relative bg-transparent h-16 w-16">
            <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-full rounded-full"/>
            </div>
            <div className="flex flex-col gap-0">
            <h2 className="text-xl text-black">Elvis</h2>
            <p className="text-sm text-slate-500">online</p>
            </div>
          </div>
        </div>
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

          {/* <div className="flex bg-white text-black mr-auto p-2 px-4 w-fit rounded-xl">
            <p className="text-lg">This is a text</p>
          </div> */}
          {messages.map((currentMsg, i) => (
            <motion.div
              key={currentMsg + i}
              animate={{ scale: 1, x: "0%", opacity: 1 }}
              initial={{ scale: 0, x: "100%", opacity: 0 }}
              ref={latestMsg}
              className="flex bg-blue-500 text-white ml-auto p-2 px-4 w-fit rounded-xl"
            >
              <p className="text-lg">{currentMsg}</p>
            </motion.div>
          ))}
        </main>
        <div className="w-full h-16 p-2 pl-4 flex items-center relative gap-2  border-t border-3 border-slate-400">
          <button className="bg-slate-300 text-slate-700 p-2 rounded-xl">
            <VscSmiley className="text-2xl" />
          </button>
          <button className="bg-slate-300 text-slate-700 p-2 rounded-xl">
            <BiMicrophone className="text-2xl" />
          </button>
          <button className="bg-slate-300 text-slate-700 p-2 rounded-xl">
            <RiImageAddLine className="text-2xl" />
          </button>

          <form
            onSubmit={sendMessage}
            className="w-full flex items-center gap-1 "
          >
            <input
              required
              type="text"
              value={message}
              placeholder="Message here"
              className="p-2 px-4 w-full bg-transparent rounded-xl "
              onChange={(e) => setMessage(e.target.value)}
              onBlur={(e) => setMessage(e.target.value)}
            />
            <button className="rounded-xl ml-auto p-2 bg-blue-500 flex items-center justify-center active:scale-90 duration-300 hover:bg-blue-400">
              <MdSend className="text-white text-2xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
