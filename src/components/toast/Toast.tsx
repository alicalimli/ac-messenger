import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";

let toastTimeout: any;

interface ToastProps {
  msg: string | undefined;
  setMsg?: (state: string) => void;
  durationMS?: number;
  type?: string;
}

// Pass only children when duration isn't needed in the toast message.
const Toast = ({ type, durationMS, msg, setMsg }: ToastProps): JSX.Element => {
  const removeMsg = () => {
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => setMsg && setMsg(""), durationMS);
  };

  const renderIcon = (): JSX.Element | null => {
    console.log("ss");
    switch (type) {
      case "loading":
        return <AiOutlineLoading3Quarters />;
      case "notification":
        return <IoMdNotificationsOutline className="text-green-500" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (durationMS) removeMsg();
  }, [msg]);

  return createPortal(
    <motion.div
      key="msg-toast"
      animate={{ y: 0, x: "-50%" }}
      exit={{ y: -100, x: "-50%" }}
      initial={{ y: -100, x: "-50%" }}
      className="bg-white mt-4 fixed top-0 left-1/2 flex gap-2 items-center justify-center z-10 shadow-md p-2 px-4 rounded-xl"
    >
      {type === "loading" ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <IoMdNotificationsOutline className="text-xl" />
      )}
      {msg}
    </motion.div>,
    document.getElementById("toast") as HTMLElement
  );
};

export default Toast;
