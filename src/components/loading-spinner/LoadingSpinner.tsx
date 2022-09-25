import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingSpinnerProps {
  msg: string;
}

const LoadingSpinner = ({ msg }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center gap-2 ">
      <AiOutlineLoading3Quarters className="animate-spin text-3xl  text-primary-main" />
      <p className="text-black dark:text-white">{msg}</p>
    </div>
  );
};

export default LoadingSpinner;
