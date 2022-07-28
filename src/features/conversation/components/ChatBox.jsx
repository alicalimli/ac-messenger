import React, { useEffect, useRef, useState, useContext } from "react";

import { AiOutlineArrowDown } from "react-icons/ai";

import { AnimatePresence, motion } from "framer-motion";

import Messages from "./Messages";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";

import elvis from "/src/assets/images/elvis.jpg";

import { UserTokenContext, UserContext } from "/src/setup/app-context-manager";

import { TwButton, TwTrnButton } from "/src/components";

let ws = null;

const ChatBox = () => {
  const [userToken, setUserToken] = useContext(UserTokenContext);
  const [userInfo, setUserInfo] = useContext(UserContext);

  const [messages, setMessages] = useState([]);

  const [active, setActive] = useState(false);
  const [user, setUser] = useState(true);

  const [showArrowDown, setShowArrowDown] = useState(false);

  const conversationContainer = useRef("");
  const latestMsg = useRef("");

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

  const connect = () => {
    if (ws != null && ws.readyState == 1) {
      ws.close();
    }

    let ws_protocol = "wss://";
    if (window.location.protocol == "http:") {
      ws_protocol = "ws://";
    }

    ws = new WebSocket(`${ws_protocol}0.0.0.0:9080/ws?inbox=13-3&token=${userToken}`);

    // Listen for the connection open event then call the sendMessage function
    ws.onopen = function (e) {
      console.log(e);
      console.log("Connected");
    };

    // Listen for the close connection event
    ws.onclose = function (e) {
      console.log(e);
      console.log("Disconnected " + e.reason);
    };

    // Listen for connection errors
    ws.onerror = function (e) {
      console.log(e);
      console.log("Error " + e.reason);
    };

    ws.onmessage = function (e) {
      try {
        let data = JSON.parse(e.data);
        // if data sent is a text
        if (data["type"] == "txt") {
          const { uname, msg } = data;
          const user = uname === userInfo.email;

          const friend = setMessages((messages) => [
            ...messages,
            { user: user, message: msg },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };
  };

  useEffect(() => {
    if (!latestMsg.current) return;
    latestMsg.current.scrollIntoView();
  }, [messages, latestMsg.current]);

  useEffect(() => {
    connect();

    return () => {
      ws.close();
    };
  }, []);

  return (
    <section className="h-screen w-screen justify-center hidden bg-black md:flex bg-muted-light/10 dark:bg-black duration-300">
      <div className="w-full flex flex-col gap-4">
        <TwTrnButton addClass="block md:hidden">{`< Back`}</TwTrnButton>

        <ChatHeader />

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

          <ChatForm ws={ws} connect={connect}/>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
