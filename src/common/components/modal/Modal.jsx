import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ children, setShowModal }) => {
  const modalParentRef = useRef();

  const handleParentClick = (e) => {
    if (e.target === modalParentRef.current) {
      setShowModal(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {children && (
        <motion.div
          onClick={handleParentClick}
          ref={modalParentRef}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          className="bg-black/10 dark:bg-white/10 w-screen h-screen absolute top-0 left-0 z-20 flex justify-center items-center"
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            className="bg-white text-black dark:bg-black dark:text-white flex items-center justify-center z-10 shadow-md p-4 px-8 rounded-xl"
          >
            {" "}
            {children}{" "}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal")
  );
};

export default Modal;
