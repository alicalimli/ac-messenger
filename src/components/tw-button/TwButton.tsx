import { motion } from "framer-motion";

interface TwButtonProps {
  children: any;
  disabled?: boolean;
  onClick?: any;
  className?: string;
  type?: "submit" | "reset" | "button";
  variant?: "contained" | "transparent" | "outline";
}

const ContainedBtnClass = ` bg-primary-main hover:bg-primary-tinted text-white`;
const TransparentBtnClass = `text flex gap-4 items-center hover:bg-muted-light/5 text-md dark:hover:bg-muted-dark/10`;
const OutlineBtnClass = `${TransparentBtnClass} border`;

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
      case "outline":
        return OutlineBtnClass;
      default:
        return "";
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick || null}
      disabled={disabled ? true : false}
      className={`${className} ${getVariantClass()} p-2 px-4 rounded-xl`}
    >
      {children}
    </motion.button>
  );
};

export default TwButton;
