import React, { useEffect, useRef, useState } from "react";

import { BiMicrophone } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { VscSmiley } from "react-icons/vsc";

import { Modal, TwButton } from "components";
import { Message } from "interfaces";
import { useAppSelector } from "app/hooks";
import { getChatState } from "features/inbox/chatReducer";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "services/firebase";
import { getUserState } from "features/authentication/userSlice";
import { v4 as uuid } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

interface ChatFormProps {
  setMessages: (state: Message[] | any) => void;
}

const ChatForm = ({ setMessages }: ChatFormProps) => {
  const { user: currentUser } = useAppSelector(getUserState);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | any>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageStorageName, setImageStorageName] = useState<string>("");

  const imageInputRef = useRef<any>(null);

  const { chatId, recipient } = useAppSelector(getChatState);

  const sendMessage = async (imgURL?: string) => {
    const chatDocRef = doc(db, "chats", chatId);

    if (imgURL) {
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: uuid(),
          message: "",
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: imgURL,
        }),
      });
    } else {
      setMessage("");
      await updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: uuid(),
          message,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: "",
        }),
      });
    }

    // To fix i used temporary timestamp now since servertimestamp is somewhat being delayed therefore causing my app to crash it should be server timestamp

    const userChatDocRef = doc(db, "userChats", currentUser.uid);
    const recipientChatDocRef = doc(db, "userChats", recipient.uid);
    const recipientChatDocData = (await getDoc(recipientChatDocRef)).data();
    await updateDoc(userChatDocRef, {
      [chatId + ".lastMessage"]: {
        message: !imgURL ? `You: ${message}` : "You: sent a picture.",
        date: Timestamp.now(),
      },
    });
    await updateDoc(recipientChatDocRef, {
      [chatId + ".lastMessage"]: {
        message: !imgURL ? message : "sent a picture.",
        date: Timestamp.now(),
      },
      // If recipient is not viewing their conversation show unread style
      [chatId + ".unread"]: recipientChatDocData?.[chatId].active
        ? false
        : true,
      [chatId + ".unreadMsgCount"]:
        !recipientChatDocData?.[chatId].active && increment(1),
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

  const handleImageChange = async (e: any) => {
    const imageUpload = e.target.files[0];

    setImage(imageUpload);

    if (!imageUpload) return;

    const imageName = `images/${imageUpload.name + uuid()}`;
    const imageRef = ref(storage, imageName);

    setImageStorageName(imageName);

    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        setShowModal(true);
      });
    });
  };

  const closeImageModal = (deleteStorageImage?: boolean) => {
    if (deleteStorageImage) {
      const imageRef = ref(storage, imageStorageName);
      deleteObject(imageRef);
    }

    imageInputRef.current.value = "";
    setImageStorageName("");
    setShowModal(false);
    setImage(null);
    setImageUrl("");
  };

  const handleSendImage = () => {
    sendMessage(imageUrl);
    closeImageModal();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative w-full flex px-2 items-center gap-1 bg-white dark:bg-bgmain-dark rounded-full duration-300"
    >
      <Modal
        isHidingModal={false}
        className="p-2 px-2"
        setShowModal={setShowModal}
      >
        {showModal && (
          <div className="flex flex-col gap-2">
            <img src={imageUrl} className="w-64 rounded-xl" />
            <div className="flex flex-col gap-1 ">
              <TwButton
                onClick={handleSendImage}
                className="py-1"
                variant="contained"
              >
                Send
              </TwButton>
              <TwButton
                onClick={() => closeImageModal(true)}
                className="justify-center py-1"
                variant="outline"
              >
                Cancel
              </TwButton>
            </div>
          </div>
        )}
      </Modal>
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
            ref={imageInputRef}
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
