import { motion } from "framer-motion";

const TwButton = ({
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
      className={`${addClass} bg-primary-main hover:bg-primary-tinted
          	rounded-xl p-2 px-4 text-white`}
    >
      {children}
    </motion.button>
  );
};

export default TwButton;
