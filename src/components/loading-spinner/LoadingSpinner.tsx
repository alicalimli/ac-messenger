import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VARIANTS_MANAGER } from "setup/variants-manager";

interface LoadingSpinnerProps {
  className?: string;
  msg: string;
}

const LoadingSpinner = ({ className, msg }: LoadingSpinnerProps) => {
  return (
    <motion.div
      variants={VARIANTS_MANAGER}
      animate="fade-in"
      initial="fade-out"
      className={`${className} flex flex-col justify-center items-center gap-2`}
    >
      <AiOutlineLoading3Quarters className="animate-spin text-3xl  text-primary-main" />
      <p className="text-black dark:text-white">{msg}</p>
    </motion.div>
  );
};

export default LoadingSpinner;
