import React, { useState, useEffect, useRef } from "react";

import { MdSend } from "react-icons/md";
import { VscSmiley } from "react-icons/vsc";
import { BiMicrophone } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";

import { AiOutlineArrowDown } from "react-icons/ai";

import { motion, AnimatePresence } from "framer-motion";

import elvis from "/src/assets/images/elvis.jpg";
import Messages from "./messages/Messages";

import { TwTrnButton, TwButton } from "/src/common/components";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [active, setActive] = useState(false);
  const [user, setUser] = useState(true);

  const [showArrowDown, setShowArrowDown] = useState(false);

  const conversationContainer = useRef("");
  const latestMsg = useRef("");

  const sendMessage = (event) => {
    event.preventDefault();

    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    const time = Intl.DateTimeFormat("en-us", timeOptions).format(new Date());

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { user: user, message: message, time: time },
    ]);
  };

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
    <section className="h-screen w-screen justify-center hidden md:flex bg-muted-light/10 dark:bg-black duration-300">
      <div className="w-full flex flex-col gap-4">
        <TwTrnButton addClass="block md:hidden">{`< Back`}</TwTrnButton>
        <header className="border-b border-muted-light/10 dark:border-muted-dark/10 w-full p-4 flex items-center mb-auto flex items-center gap-4 bg-white dark:bg-gray-900 duration-300">
          <div className="relative bg-transparent h-16 w-16">
            <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
            <img src={elvis} className="w-full rounded-full" />
          </div>
          <div className="flex flex-col gap-0">
            <h2 className="text-xl text-black dark:text-white">Elvis</h2>
            <p className="text-sm text-muted-light dark:text-muted-dark">
              online
            </p>
          </div>
        </header>

        <main
          ref={conversationContainer}
          className="relative flex flex-col overflow-scroll scrollbar-hide px-4"
        >
          <Messages messages={messages} latestMsgRef={latestMsg} />
        </main>

        <div className="relative w-full flex items-center relative gap-2 p-4 pt-0">
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

          <form
            onSubmit={sendMessage}
            className="relative w-full flex items-center gap-1 bg-white dark:bg-gray-900 rounded-full duration-300"
          >
            <div className="flex p-2">
              <button type="button" className="text-muted-light dark:text-muted-dark/50 p-2">
                <VscSmiley className="text-2xl" />
              </button>
              <button type="button" className="text-muted-light dark:text-muted-dark/50 p-2">
                <BiMicrophone className="text-2xl" />
              </button>
              <button type="button" className="text-muted-light dark:text-muted-dark/50 p-2">
                <RiImageAddLine className="text-2xl" />
              </button>
              <button
              type="button"
                onClick={(e) => {
                  const btn = e.target.closest("button");
                  if (active) {
                    setActive(false);
                    btn.style.background = "gray";
                    console.log("not active");
                  } else if (!active) {
                    setActive(true);
                    console.log("active");
                    btn.style.background = "blue";
                  }

                  setUser(!user);
                }}
                className="text-muted-light dark:text-muted-dark/50 p-2"
              >
                <BiUser className="text-2xl" />
              </button>
            </div>

            <input
              required
              type="text"
              value={message}
              placeholder="Message here"
              className="p-2 px-4 w-full bg-transparent outline-none text-dark dark:text-white"
              onChange={(e) => setMessage(e.target.value)}
              onBlur={(e) => setMessage(e.target.value)}
            />
            <TwButton addClass="rounded-full ml-auto h-full p-4 flex items-center justify-center">
              <MdSend className={`text-white text-2xl`} />
            </TwButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
