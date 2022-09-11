import React, { useState } from "react";

import { BiMicrophone } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { VscSmiley } from "react-icons/vsc";

import { TwButton } from "components";

interface ChatFormProps {
  setMessages: any;
}

const ChatForm = ({ setMessages }: ChatFormProps) => {
  const [message, setMessage] = useState("");

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("ss");

    if (!message) return;

    const userMessage = {
      username: "chately",
      message,
      time: "12:00",
    };

    setMessages((state: any) => {
      const messagesArray = [...state, userMessage];
      console.log(messagesArray);
      return messagesArray;
    });
    setMessage("");

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
      <TwButton
        type="submit"
        className="rounded-full ml-auto h-full p-4 flex items-center justify-center"
      >
        <MdSend className={`text-white text-2xl`} />
      </TwButton>
    </form>
  );
};

export default ChatForm;
