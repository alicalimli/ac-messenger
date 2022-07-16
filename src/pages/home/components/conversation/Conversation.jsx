import React, { useState } from "react";

import { MdSend } from "react-icons/md";
import { VscSmiley } from "react-icons/vsc";
import { BiMicrophone } from "react-icons/bi";
import { RiImageAddLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";

import elvis from "/src/assets/images/elvis.jpg";
import Messages from "./messages/Messages";

import {TwTrnButton} from '/src/common/components'

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [active, setActive] = useState(false);
  const [user, setUser] = useState(true);

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

  return (
    <section className="h-screen w-screen p-4 md:px-32 justify-center hidden lg:flex">
      <div className="w-full flex flex-col gap-4">
              <TwTrnButton
              addClass="block md:hidden"
        >{`< Back`}</TwTrnButton>
        <header className="bg-white dark:bg-black rounded-xl w-full h-20 p-2 px-4 flex items-center mb-auto">
          <div className="flex items-center gap-4">
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
          </div>
        </header>

        <Messages messages={messages} />

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
          <button
            onClick={(e) => {
              const btn = e.target.closest("button");

              console.log(active);
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
            className="bg-slate-300 text-slate-700 p-2 rounded-xl"
          >
            <BiUser className="text-2xl" />
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
    </section>
  );
};

export default ChatBox;
