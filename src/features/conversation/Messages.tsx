import { getUserState } from "features/authentication/userSlice";
import { motion } from "framer-motion";
import { useAppSelector } from "app/hooks";

interface MessagesProps {
  messages: any;
  latestMsgRef: React.Ref<HTMLButtonElement>;
}

const Messages = ({ messages, latestMsgRef }: MessagesProps) => {
  const { user: currentUser } = useAppSelector(getUserState);

  return messages.map((currentMsg: any, i: number) => (
    <div
      key={currentMsg.message + i}
      className={`group gap-2 py-1 flex ${
        currentMsg.senderId === currentUser.uid ? "flex-row-reverse" : ""
      }`}
    >
      <div className="flex flex-col gap-1 items-end">
        {currentMsg.img && (
          <img
            src={currentMsg.img}
            className="w-64 bg-muted-dark/10 rounded-xl"
          />
        )}
        <motion.button
          animate={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0, opacity: 0 }}
          ref={latestMsgRef}
          className={`
              peer flex rounded-full p-1.5 px-3 w-fit
              ${
                currentMsg.senderId === currentUser.uid
                  ? "focus:bg-primary-tinted  bg-primary-main text-white rounded-br-sm"
                  : "bg-white text-black rounded-bl-sm"
              }
            `}
        >
          <p className="text-md">{currentMsg.message}</p>
        </motion.button>
        <div className="opacity-0 peer-focus:opacity-100 group-hover:opacity-100 duration-300">
          <time className="ml-auto text-sm text-slate-500">
            {currentMsg.date.toString()}
          </time>
        </div>
      </div>
    </div>
  ));
};

export default Messages;
