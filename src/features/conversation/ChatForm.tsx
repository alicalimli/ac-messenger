import React, { useState } from "react";

import { BiMicrophone } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { VscSmiley } from "react-icons/vsc";

import { TwButton } from "components";
import { Message } from "interfaces";
import { useAppSelector } from "app/hooks";
import { getChatState } from "features/inbox/chatReducer";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "services/firebase";

interface ChatFormProps {
  setMessages: (state: Message[] | any) => void;
}

const ChatForm = ({ setMessages }: ChatFormProps) => {
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File>();

  const { chatId } = useAppSelector(getChatState);

  const sendMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (!image) {
        console.log(chatId);
        const userChatDocRef = doc(db, "chats", chatId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: any) => setImage(e.target.value);

  return (
    <form
      onSubmit={sendMessage}
      className="relative w-full flex px-2 items-center gap-1 bg-white dark:bg-bgmain-dark rounded-full duration-300"
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
        <label
          htmlFor="image-input"
          className="text-muted-light dark:text-muted-dark/50 p-2 cursor-pointer"
        >
          <input
            type="file"
            id="image-input"
            className="hidden"
            onChange={handleFileChange}
          />
          <RiImageAddLine className="text-2xl" />
        </label>
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
        disabled={!message as unknown as boolean}
        className="rounded-full relative ml-auto h-full p-4 px-2 flex items-center justify-center"
      >
        <MdSend className={`text-white text-2xl`} />
      </TwButton>
    </form>
  );
};

export default ChatForm;
