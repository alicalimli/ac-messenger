import {useContext} from 'react'
import { TwTrnButton } from "/src/components";
import { useGetInboxList } from "../hooks";

import {CurrentChatContext} from '/src/setup/app-context-manager'

const InboxList = () => {
  const inboxLists = useGetInboxList();
  const [currentChat, setCurrentChat] = useContext(CurrentChatContext)

  const inboxListClickHandler = (inboxList) => {
    setCurrentChat(inboxList)
  }

  return (
    <div className=" p-4 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-2xl">Chats</h1>
      <div>
        {inboxLists.map((inboxList, i) => (
          <TwTrnButton clickHandler={() => inboxListClickHandler(inboxList)} addClass="w-full p-2" key={inboxList.sender_name + i}>
            <div className="relative bg-transparent h-16 w-16">
              <div className="bg-green-500 p-2 rounded-full absolute right-1 bottom-0"></div>
              <img src={inboxList.profile} className="w-full rounded-full" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-xl text-black dark:text-white">
                {inboxList.sender_name}
              </h2>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                {inboxList.last_message}
              </p>
            </div>
          </TwTrnButton>
        ))}
      </div>
    </div>
  );
};

export default InboxList;
