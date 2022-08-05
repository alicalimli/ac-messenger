import React, { useState } from "react";

import { BiMicrophone, BiUser } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { VscSmiley } from "react-icons/vsc";

import { TwButton, TwTrnButton } from "/src/components";

import { useConnect } from "../hooks";

const ChatForm = ({ ws, wsConnect, inboxHash, messages, setMessages }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();

    if (!message) return;

    setMessage("");

    if (ws != null && message.length) {
      if (ws.readyState == 3) {
        wsConnect();
        console.log("Reconnect");
      }

      if (ws.readyState == 1) {
        let data = { msg: message };
        ws.send(JSON.stringify(data));
        console.log("Message sent");
      }
    }
    if (ws == null && message.length) {
      console.log("Connection to inbox is required");
      console.log("Connection to inbox is required");
    }
        ws.onmessage = function (e) {
      try {
        let data = JSON.parse(e.data);
        // if data sent is a text
        if (data["type"] == "txt") {
          const { uname: username, msg } = data;

          const friend = setMessages((messages) => [
            ...messages,
            { username,  msg },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // const timeOptions = {
    //   hour: "numeric",
    //   minute: "numeric",
    // };
  };
  return (
    <form
      onSubmit={sendMessage}
      className="relative w-full flex items-center gap-1 bg-white dark:bg-bgmain-dark rounded-full duration-300"
    >
      <div className="flex p-2">
        <button
          type="button"
          className="text-muted-light dark:text-muted-dark/50 p-2"
        >
          <VscSmiley className="text-2xl" />
        </button>
        <button
          type="button"
          className="text-muted-light dark:text-muted-dark/50 p-2"
        >
          <BiMicrophone className="text-2xl" />
        </button>
        <button
          type="button"
          className="text-muted-light dark:text-muted-dark/50 p-2"
        >
          <RiImageAddLine className="text-2xl" />
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
  );
};

export default ChatForm;
