import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface sharedProps {
  isExpanded: boolean;
  children: any;
  onClick: any;
}

const Shared = ({ isExpanded, children, onClick }: sharedProps) => {
  return createPortal(
    <motion.div
      onClick={onClick}
      className={`${
        isExpanded &&
        "bg-black/20 dark:bg-white/20 w-screen h-screen absolute top-0 left-0 z-20 flex justify-center items-center"
      }`}
    >
      {children}
    </motion.div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Shared;
