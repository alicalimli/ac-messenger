import { motion } from "framer-motion";
import { VARIANTS_MANAGER } from "setup/variants-manager";

interface ErrorMsgProps {
  img: any;
  msg: String;
  subMsg?: String;
  className?: string;
}

const ErrorMsg = ({ img, msg, subMsg, className }: ErrorMsgProps) => {
  return (
    <motion.figure
      className={`${className} flex flex-col gap-4 items-center justify-center w-full p-4`}
      variants={VARIANTS_MANAGER}
      animate="fade-in"
    >
      <img src={img} className="w-64 md:w-96" />
      <figcaption className="flex flex-col gap-2 text-center">
        <h1 className="text text-xl max-w-md ">{msg}</h1>
        <p className="text-muted text-sm ">{subMsg}</p>
      </figcaption>
    </motion.figure>
  );
};

export default ErrorMsg;
