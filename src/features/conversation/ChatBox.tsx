import { memo, SyntheticEvent, useEffect, useRef, useState } from "react";

import { AiOutlineArrowDown } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMsg, LoadingSpinner, Modal, TwButton } from "components";

import MessageBox from "./MessageBox";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import { Message, User } from "interfaces";
import { useAppSelector } from "hooks";
import { getChatState } from "features/inbox/chatReducer";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "setup/firebase";
import { start_chatting } from "assets/images";
import { getUserState } from "features/authentication/userSlice";

interface ChatBoxProps {
  recipient: User;
}

const ChatBox = ({ recipient }: ChatBoxProps) => {
  const [showArrowDown, setShowArrowDown] = useState(false);
  const conversationContainer = useRef<HTMLDivElement>(null);
  const latestMsg = useRef<HTMLButtonElement>(null);
  const [fetchedMsgs, setFetchedMsgs] = useState<Message[]>([]);

  const [latestDocSlice, setLatestDocSlice] = useState<any>(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const { chatId, isGroup } = useAppSelector(getChatState);
  const { user: currentUser } = useAppSelector(getUserState);

  const [isEditingMsg, setIsEditingMsg] = useState(false);
  const editingMsgRef = useRef();

  const conversationDocRef = chatId && doc(db, "chats", chatId);
  const userChatDocRef = doc(db, "userChats", currentUser.uid);

  const scrollDown = () => {
    latestMsg?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const chatBoxScrollHandler = (event: SyntheticEvent) => {
    const target = event.currentTarget;
    if (target.scrollHeight - target.scrollTop > target.clientHeight + 300) {
      setShowArrowDown(true);
    } else {
      setShowArrowDown(false);
    }

    const container = conversationContainer.current;

    if (!container) return;

    let triggerHeight = container.scrollTop === 0;
    if (triggerHeight) {
      setLatestDocSlice((state: number) => (state -= 15));
    }
  };

  const unreadMsg = async () => {
    // handle number of unread messages
    // Seen the conversation
    if (isGroup) return;

    updateDoc(userChatDocRef, {
      [chatId + ".unread"]: false,
      [chatId + ".unreadMsgCount"]: 0,
      [chatId + ".active"]: true,
    });
  };

  useEffect(() => {
    // For some reason i have to delay it with 1ms for it work.
    setTimeout(() => {
      if (!latestMsg.current) return;
      latestMsg.current.scrollIntoView();
    }, 1);
  }, [messages, latestMsg.current]);

  useEffect(() => {
    if (!chatId) return;

    setLatestDocSlice(-15);

    setIsPending(true);
    setMessages([]);

    unreadMsg();

    const unsub = onSnapshot(conversationDocRef, (doc: any) => {
      if (!doc.exists()) return;

      setFetchedMsgs(doc.data().messages);
      setIsPending(false);
    });

    return () => {
      unsub();

      !isGroup &&
        updateDoc(userChatDocRef, {
          [chatId + ".active"]: false,
        });
    };
  }, [chatId]);

  useEffect(() => {
    if (!fetchedMsgs.length) return;

    if (messages.length === fetchedMsgs.length) return;

    setMessages(fetchedMsgs.slice(latestDocSlice));
  }, [latestDocSlice, fetchedMsgs]);

  return (
    <section className="flex h-full w-full">
      <div className="bg-secondary w-full flex flex-col">
        <ChatHeader recipient={recipient} />

        <div className="flex flex-grow items-center justify-center">
          {isPending && <LoadingSpinner msg="fetching messages..." />}

          {!messages.length && !isPending && (
            <ErrorMsg
              className="w-44 sm:w-64 mb-5 self-center justify-self-center"
              img={start_chatting}
              msg="Your conversation is empty."
              subMsg="start chatting below"
            />
          )}
        </div>

        {messages.length !== 0 && (
          <main
            ref={conversationContainer}
            onScroll={chatBoxScrollHandler}
            className="relative flex flex-col overflow-y-scroll overflow-x-hidden px-4 scrollbar-hide"
          >
            {messages
              .sort((a: any, b: any) => a.date.toDate() - b.date.toDate())
              .map((currentMsg: Message, i: any) => (
                <MessageBox
                  key={currentMsg.id}
                  currentMsg={currentMsg}
                  latestMsgRef={latestMsg}
                  isEditingMsg={isEditingMsg}
                  editingMsgRef={editingMsgRef}
                  setIsEditingMsg={setIsEditingMsg}
                />
              ))}
          </main>
        )}

        <div className="w-full flex items-center relative gap-2 p-4 pt-0">
          <AnimatePresence>
            {showArrowDown && (
              <motion.div
                animate={{ opacity: 1, x: -50 }}
                initial={{ opacity: 0, x: -50 }}
                exit={{ opacity: 0, x: -50 }}
                className="absolute -top-3/4 left-1/2 z-10"
              >
                <TwButton onClick={scrollDown} className="rounded-full px-2">
                  <AiOutlineArrowDown className="text-xl text-white " />
                </TwButton>
              </motion.div>
            )}
          </AnimatePresence>

          {chatId && (
            <ChatForm
              isEditingMsg={isEditingMsg}
              editingMsgRef={editingMsgRef}
              setIsEditingMsg={setIsEditingMsg}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
