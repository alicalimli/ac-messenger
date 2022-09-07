import { motion } from "framer-motion";

interface TwButtonProps {
  children: any;
  disabled?: boolean;
  onClick?: any;
  className?: string;
  type?: "submit" | "reset" | "button";
  variant?: "contained" | "transparent";
}

const ContainedBtnClass = ` bg-primary-main hover:bg-primary-tinted
rounded-xl p-2 px-4 text-white`;
const TransparentBtnClass = `flex gap-4 items-center  hover:bg-muted-light/5 text-md dark:hover:bg-muted-dark/10 text-black dark:text-white p-2 px-4 rounded-xl`;

const TwButton = ({
  children,
  disabled,
  className = "",
  onClick,
  type = "button",
  variant = "contained",
}: TwButtonProps) => {
  const getVariantClass = (): string => {
    switch (variant) {
      case "transparent":
        return TransparentBtnClass;
      case "contained":
        return ContainedBtnClass;
      default:
        return "";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick || null}
      disabled={disabled ? true : false}
      className={`${className} ${getVariantClass()}`}
    >
      {children}
    </motion.button>
  );
};

export default TwButton;
