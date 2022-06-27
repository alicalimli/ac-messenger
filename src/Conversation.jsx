import React, { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";

import { IoIosSend } from "react-icons/io";

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const latestMsg = useRef("");

  const sendMessage = (event) => {
    event.preventDefault();
    setMessage("");
    setMessages((messages) => [...messages, message]);
    console.log(latestMsg.current.textContent);
    console.log(messages);
  };

  useEffect(() => {
    if (!latestMsg.current) return;

    latestMsg.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-screen p-4 flex justify-center">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <div className="bg-white rounded-xl w-full h-20 p-2 px-4 flex items-center mb-auto">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 h-12 w-12 rounded-full"></div>
            <h2 className="text-2xl text-black">Elvis</h2>
          </div>
        </div>
        <main className="flex flex-col gap-2 overflow-scroll scrollbar-hide">
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
        <div className="bg-white rounded-xl w-full h-16 p-2 flex items-center">
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
