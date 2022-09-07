import { motion } from "framer-motion";

interface TwButtonProps {
  children: JSX.Element;
  disabled: boolean;
  onClick: any;
  className?: string;
  btnType?: "submit" | "reset" | "button" | undefined;
}

const TwButton = ({
  children,
  disabled,
  className = "",
  onClick,
  btnType,
}: TwButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={btnType || undefined}
      onClick={onClick || null}
      disabled={disabled ? true : false}
      className={`${className} bg-primary-main hover:bg-primary-tinted
          	rounded-xl p-2 px-4 text-white`}
    >
      {children}
    </motion.button>
  );
};

export default TwButton;
