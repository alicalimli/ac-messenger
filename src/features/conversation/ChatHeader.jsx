import { AiOutlineArrowLeft } from "react-icons/ai";

import { TwTrnButton } from "/src/components";

const ChatBox = ({ currentChat, setCurrentChat }) => {
  const handleBackBtn = () => {
    setCurrentChat(null);
  };

  return (
    <header className="border-b border-muted-light/10 dark:border-muted-dark/10 w-full p-4  mb-auto bg-white dark:bg-bgmain-dark duration-300 flex gap-2">
      <TwTrnButton clickHandler={handleBackBtn} addClass="md:hidden px-4">
        <AiOutlineArrowLeft className="text-xl" />
      </TwTrnButton>
      <div className="flex items-center gap-4">
        <div className="relative bg-transparent h-16 w-16">
          <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
          <img src={currentChat.profile} className="w-full rounded-full" />
        </div>
        <div className="flex flex-col gap-0">
          <h2 className="text-xl text-black dark:text-white">
            {currentChat.sender_name}
          </h2>
          <p className="text-sm text-muted-light dark:text-muted-dark">
            online
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatBox;
