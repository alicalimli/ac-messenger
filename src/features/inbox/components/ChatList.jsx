import { TwTrnButton } from "/src/components";

const ChatList = ({ chats, chatClickHandler }) => {
  return chats.map((chat, i) => (
          <TwTrnButton
            clickHandler={(e) => chatClickHandler(e, chat)}
            key={chat.sender_name + i}
            addClass={`w-full p-2 ${chat.active_chat && "bg-muted-light/5 dark:bg-muted-dark/10 " }`}
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
  ));
};

export default ChatList;
