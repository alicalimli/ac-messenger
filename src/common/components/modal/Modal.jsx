import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ children }) => {
  return createPortal(
    <AnimatePresence>
      {children && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          initial={{ opacity: 0, scale: 0 }}
          className="bg-white mt-4 fixed top-1/2 left-1/2 flex items-center justify-center z-10 shadow-md p-4 px-8 rounded-xl"
        >
          {" "}
          {children}{" "}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal")
  );
};

export default Modal;
