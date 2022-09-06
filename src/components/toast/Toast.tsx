import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

let toastTimeout: any;

interface ToastProps {
  children?: JSX.Element | any;
  durationMs?: number;
  msg?: string | undefined;
  setMsg?: any;
}

// Pass only children when duration isn't needed in the toast message.
const Toast = ({ children, durationMs, msg, setMsg }: ToastProps) => {
  const removeMsg = () => {
    if (!durationMs || typeof +durationMs !== "number") return;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => setMsg(""), +durationMs);
  };

  useEffect(() => {
    removeMsg();
  }, [msg]);

  return createPortal(
    <AnimatePresence>
      {msg && (
        <motion.div
          key="msg-toast"
          animate={{ y: 0, x: "-50%" }}
          exit={{ y: -100, x: "-50%" }}
          initial={{ y: -100, x: "-50%" }}
          className="bg-white mt-4 fixed top-0 left-1/2 flex items-center justify-center z-10 shadow-md p-2 px-4 rounded-xl"
        >
          {" "}
          {msg}
        </motion.div>
      )}

      {children && (
        <motion.div
          key="children-toast"
          animate={{ y: 0, x: "-50%" }}
          exit={{ y: -100, x: "-50%" }}
          transition={{ duration: 0.3 }}
          initial={{ y: -100, x: "-50%" }}
          className="bg-white mt-4 fixed top-0 left-1/2 flex items-center justify-center z-10 shadow-md p-4 px-8 rounded-xl"
        >
          {children as unknown as ReactNode}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("toast") as HTMLElement
  );
};

export default Toast;
