import { TwTrnButton } from "/src/components";

const ChatList = ({ chat, setCurrentChat}) => {

  const chatClickHandler = (chat) => {
    setCurrentChat(chat);
  };
  return (
          <TwTrnButton
            clickHandler={() => chatClickHandler(chat)}
            addClass="w-full p-2"
          >
            <div className="relative bg-transparent h-16 w-16">
              <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
              <img src={chat.profile} className="w-full rounded-full" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl text-black dark:text-white">
                {chat.sender_name}
              </h2>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                {chat.last_message}
              </p>
            </div>
          </TwTrnButton>
  );
};

export default ChatList;
