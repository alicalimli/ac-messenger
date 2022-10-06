import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingSpinnerProps {
  className?: string;
  msg: string;
}

const LoadingSpinner = ({ className, msg }: LoadingSpinnerProps) => {
  return (
    <div
      className={`${className} flex flex-col justify-center items-center gap-2`}
    >
      <AiOutlineLoading3Quarters className="animate-spin text-3xl  text-primary-main" />
      <p className="text-black dark:text-white">{msg}</p>
    </div>
  );
};

export default LoadingSpinner;
