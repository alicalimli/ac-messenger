import { AiOutlineArrowLeft } from "react-icons/ai";

import { TwButton } from "components";
import { User } from "interfaces";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getChatState, resetChat } from "features/inbox/chatReducer";
import { useGetUserStatus } from "hooks";

const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

interface ChatHeaderProps {
  recipient: User;
}

const ChatHeader = ({ recipient }: ChatHeaderProps) => {
  const { chatId } = useAppSelector(getChatState);
  const online = useGetUserStatus(recipient.uid.toString());

  const dispatch = useAppDispatch();

  const handleBackBtn = () => {
    dispatch(resetChat());
  };

  return (
    <header className="border-b border-muted-light/10 dark:border-muted-dark/10 w-full p-4  mb-auto bg-white dark:bg-bgmain-dark duration-300 flex gap-2">
      <TwButton
        variant="transparent"
        onClick={handleBackBtn}
        className="md:hidden px-4"
      >
        <AiOutlineArrowLeft className="text-xl" />
      </TwButton>
      <div className="flex items-center gap-4">
        <div className="relative bg-transparent h-16 w-16">
          <div
            className={`${
              online ? "bg-green-500 " : "bg-red-500 "
            }p-1.5 rounded-full absolute right-1 bottom-0 `}
          ></div>
          <img
            src={recipient.photoURL || DEFAULT_PROFILE_IMAGE}
            className="w-full rounded-full"
          />
        </div>
        <div className="flex flex-col gap-0">
          <h2 className="text-xl text-black dark:text-white">
            {recipient.displayName}
          </h2>
          <p className="text-sm text-muted-light dark:text-muted-dark">
            {online ? "online" : "offline"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
