import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface SharedLayoutProps {
  isExpanded: boolean;
  children: any;
  onClick: any;
}

const SharedLayout = ({ isExpanded, children, onClick }: SharedLayoutProps) => {
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

export default SharedLayout;
