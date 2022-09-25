import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface loadingSpinnerProps {
  msg: string;
}

const loadingSpinner = ({ msg }: loadingSpinnerProps) => {
  return (
    <div className="flex items-center gap-2 ">
      <AiOutlineLoading3Quarters className="animate-spin text-3xl text-primary-main" />
      <p className="text-black dark:text-white">{msg}</p>
    </div>
  );
};

export default loadingSpinner;
