import { TwTrnButton } from "/src/common/components";
import elvis from "/src/assets/images/elvis.jpg";

const friends = [
  {
    name: "Elvis",
    lastMsg: "this is a test message",
    profile: elvis,
  },  {
    name: "Elvis",
    lastMsg: "this is a test message",
    profile: elvis,
  },  {
    name: "Elvis",
    lastMsg: "this is a test message",
    profile: elvis,
  },  {
    name: "Elvis",
    lastMsg: "this is a test message",
    profile: elvis,
  }
];

const Chats = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div>
        {friends.map((friend) => (
          <TwTrnButton addClass="w-full p-4">
            <div className="relative bg-transparent h-16 w-16">
              <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
              <img src={friend.profile} className="w-full rounded-full" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl text-black dark:text-white">{friend.name}</h2>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                {friend.lastMsg}
              </p>
            </div>
          </TwTrnButton>
        ))}
      </div>
    </div>
  );
};

export default Chats;
