import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const Toast = ({ children }) => {
  return createPortal(
    <AnimatePresence>
      {children && (
        <motion.div
          animate={{ y: 0, x: "-50%" }}
          exit={{ y: -100, x: "-50%" }}
          transition={{ duration: 0.3 }}
          initial={{ y: -100, x: "-50%" }}
          className="bg-white mt-4 fixed top-0 left-1/2 flex items-center justify-center z-10 shadow-md p-4 px-8 rounded-xl"
        >
          {" "}
          {children}{" "}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("toast")
  );
};

export default Toast;
