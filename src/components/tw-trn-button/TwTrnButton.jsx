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
      className={`${addClass} `}
    >
      {children}
    </motion.button>
  );
};

export default TwTrnButton;
