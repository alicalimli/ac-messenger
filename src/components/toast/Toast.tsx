import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAppDispatch } from "hooks";
import { removeToast } from "toastSlice";
import { VARIANTS_MANAGER } from "setup/variants-manager";

let toastTimeout: ReturnType<typeof setTimeout>;

interface ToastProps {
  msg: string | undefined;
  durationMS?: number;
  type?: string;
}

const Toast = ({ type, durationMS, msg }: ToastProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const removeMsg = () => {
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => dispatch(removeToast()), durationMS);
  };

  useEffect(() => {
    if (durationMS) removeMsg();
  }, [msg]);

  return createPortal(
    <motion.div
      key="msg-toast"
      variants={VARIANTS_MANAGER}
      animate="toast-slide-down"
      exit="toast-slide-up"
      initial="toast-slide-up"
      className="bg-white mt-4 whitespace-nowrap fixed top-0 left-1/2 flex gap-2 items-center justify-center z-10 shadow-md p-2 px-4 rounded-xl"
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
