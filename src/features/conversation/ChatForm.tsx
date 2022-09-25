import React, { useState } from "react";

import { BiMicrophone } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { VscSmiley } from "react-icons/vsc";

import { TwButton } from "components";
import { Message } from "interfaces";
import { useAppSelector } from "app/hooks";
import { getChatState } from "features/inbox/chatReducer";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "services/firebase";
import { getUserState } from "features/authentication/userSlice";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

interface ChatFormProps {
  setMessages: (state: Message[] | any) => void;
}

const ChatForm = ({ setMessages }: ChatFormProps) => {
  const { user: currentUser } = useAppSelector(getUserState);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const { chatId, recipient } = useAppSelector(getChatState);

  const sendMessage = async (downloadURL?: string) => {
    setImage(null);
    setMessage("");

    const chatDocRef = doc(db, "chats", chatId);
    await updateDoc(chatDocRef, {
      messages: arrayUnion({
        id: uuid(),
        message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        img: downloadURL || "",
      }),
    });

    const userChatDocRef = doc(db, "userChats", currentUser.uid);
    const recipientChatDocRef = doc(db, "userChats", recipient.uid);
    await updateDoc(userChatDocRef, {
      [chatId + ".lastMessage"]: {
        message,
        date: Timestamp.now(),
      },
    });
    await updateDoc(recipientChatDocRef, {
      [chatId + ".lastMessage"]: {
        message,
        date: Timestamp.now(),
      },
      [chatId + ".seen"]: false,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (image) {
        const storageRef = ref(storage, "images/" + uuid());

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot: any) => {
            console.log(snapshot);
          },
          (error: any) => {
            console.error(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                sendMessage(downloadURL);
              }
            );
          }
        );
      } else {
        sendMessage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
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
            onChange={handleImageChange}
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
