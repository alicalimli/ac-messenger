import { useAppSelector } from "hooks";
import { getUserState } from "features/authentication/userSlice";
import { getChatState } from "features/inbox/chatReducer";
import {
  arrayRemove,
  arrayUnion,
  doc,
  FieldValue,
  getDoc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "setup/firebase";

import { v4 as uuid } from "uuid";
import { Message } from "interfaces";

const useSendMessage = () => {
  const { user: currentUser } = useAppSelector(getUserState);
  const { chatId, recipient, isGroup } = useAppSelector(getChatState);

  const createLastMessage = async (message: string) => {
    if (isGroup) {
      const groupChatRef = doc(db, "groupChats", recipient.groupID);

      updateDoc(groupChatRef, {
        lastMessage: {
          message: `${currentUser.displayName}: ${message}`,
          date: Timestamp.now(),
        },
      });
      return;
    }

    const userChatDocRef = doc(db, "userChats", currentUser.uid);
    const recipientChatDocRef = doc(db, "userChats", recipient.uid);
    try {
      const recipientChatDocData = (await getDoc(recipientChatDocRef)).data();

      // To fix i used temporary timestamp now since servertimestamp is somewhat being delayed therefore causing my app to crash it should be server timestamp

      updateDoc(userChatDocRef, {
        [chatId + ".lastMessage"]: {
          message,
          date: Timestamp.now(),
        },
      });

      updateDoc(recipientChatDocRef, {
        [chatId + ".lastMessage"]: {
          message,
          date: Timestamp.now(),
        },
        // If recipient is not viewing their conversation show unread style
        [chatId + ".unread"]: recipientChatDocData?.[chatId + ".active"]
          ? false
          : true,
        [chatId + ".unreadMsgCount"]:
          !recipientChatDocData?.[chatId + ".active"] && increment(1),
      });
    } catch (error) {
      throw error;
    }
  };

  const sendMessage = (message: string) => {
    const chatDocRef = doc(db, "chats", chatId.toString());
    try {
      updateDoc(chatDocRef, {
        messages: arrayUnion({
          id: uuid(),
          message,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: "",
        }),
      });

      createLastMessage(message);
    } catch (error) {
      throw error;
    }
  };

  const sendImage = (imgURL: string) => {
    const chatDocRef = doc(db, "chats", chatId);
    updateDoc(chatDocRef, {
      messages: arrayUnion({
        id: uuid(),
        message: "",
        senderId: currentUser.uid,
        date: Timestamp.now(),
        img: imgURL,
      }),
    });

    createLastMessage("sent a picture.");
  };

  const deleteMsg = (msg: Message) => {
    const chatDocRef = doc(db, "chats", chatId);
    updateDoc(chatDocRef, {
      messages: arrayRemove(msg),
    });
  };

  const editMsg = async (msg: Message) => {
    const chatDocRef = doc(db, "chats", chatId);
    const msgObj = { ...msg, message: "yeahh" };

    await updateDoc(chatDocRef, {
      messages: arrayRemove(msg),
    });

    updateDoc(chatDocRef, {
      messages: arrayUnion(msgObj),
    });

    createLastMessage("edited a message.");
  };
  return { sendMessage, sendImage, deleteMsg, editMsg };
};

export default useSendMessage;
