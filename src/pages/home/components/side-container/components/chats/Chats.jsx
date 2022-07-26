import elvis from "/src/assets/images/elvis.jpg";
import { TwTrnButton } from "/src/components";

const Chats = ({ inboxLists }) => {
  console.log(inboxLists);
  return (
    <div className=" p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div>
        {inboxLists.map((list, i) => (
          <TwTrnButton addClass="w-full p-2" key={list.sender_name + i}>
            <div className="relative bg-transparent h-16 w-16">
              <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
              <img src={elvis} className="w-full rounded-full" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl text-black dark:text-white">
                {list.sender_name}
              </h2>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                {list.last_message}
              </p>
            </div>
          </TwTrnButton>
        ))}
      </div>
    </div>
  );
};

export default Chats;
