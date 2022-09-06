import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

let toastTimeout: any;

interface ToastProps {
  durationMS?: number;
  msg?: string | undefined;
  setMsg?: (state: string) => void;
}

// Pass only children when duration isn't needed in the toast message.
const Toast = ({ durationMS, msg, setMsg }: ToastProps) => {
  const removeMsg = () => {
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => setMsg && setMsg(""), durationMS);
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
      <AiOutlineLoading3Quarters className="animate-spin" />
      {msg}
    </motion.div>,
    document.getElementById("toast") as HTMLElement
  );
};

export default Toast;
