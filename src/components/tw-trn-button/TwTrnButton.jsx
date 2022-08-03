import { motion } from "framer-motion";

const TwTrnButton = ({
  children,
  isDisabled,
  addClass,
  clickHandler,
  btnType,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={btnType || null}
      onClick={clickHandler || null}
      disabled={isDisabled ? true : false}
      className={`${addClass} flex gap-4 items-center  hover:bg-muted-light/5 p-2 text-md rounded-xl dark:hover:bg-muted-dark/10 text-black dark:text-white`}
    >
      {children}
    </motion.button>
  );
};

export default TwTrnButton;
