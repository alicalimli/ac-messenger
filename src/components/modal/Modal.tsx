import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { VARIANTS_MANAGER } from "setup/variants-manager";

interface ModalProps {
  children: JSX.Element | boolean;
  className?: string;
  isHidingModal?: boolean;
  setShowModal: (state: boolean) => void;
}

const Modal = ({
  className,
  children,
  isHidingModal = true,
  setShowModal,
}: ModalProps) => {
  const modalParentRef = useRef<HTMLDivElement>(null);

  const handleParentClick = (e: React.MouseEvent) => {
    if (e.target === modalParentRef.current) {
      setShowModal(false);
    }
  };
  ``;
  return createPortal(
    <AnimatePresence>
      {children && (
        <motion.div
          onClick={isHidingModal ? handleParentClick : undefined}
          ref={modalParentRef}
          variants={VARIANTS_MANAGER}
          initial="fade-out"
          animate="fade-in"
          exit="fade-out"
          className="bg-black/5 dark:bg-white/5 w-screen h-screen absolute top-0 left-0 z-20 flex justify-center items-center"
        >
          <motion.div
            variants={VARIANTS_MANAGER}
            initial="slide-from-left"
            animate="slide-in"
            exit="slide-from-left"
            className={`${className} bg-white text-black dark:bg-bgmain-dark dark:text-white flex items-center justify-center z-10 shadow-md p-4 px-8 rounded-xl`}
          >
            {" "}
            {children}{" "}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
