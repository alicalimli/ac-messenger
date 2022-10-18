import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VARIANTS_MANAGER } from "setup/variants-manager";

interface LoadingSpinnerProps {
  className?: string;
  msg: string;
}

const LoadingSpinner = ({ className, msg }: LoadingSpinnerProps) => {
  return (
    <motion.figure
      variants={VARIANTS_MANAGER}
      animate="fade-in"
      initial="fade-out"
      className={`${className} flex flex-col justify-center items-center gap-2`}
    >
      <AiOutlineLoading3Quarters className="animate-spin text-3xl  text-primary-main" />
      <figcaption className="text-black dark:text-white">{msg}</figcaption>
    </motion.figure>
  );
};

export default LoadingSpinner;
