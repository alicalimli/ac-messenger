import { TwButton } from "components";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface SettingsContainerProps {
  setSideBarContent: (state: string) => void;
}

const SettingsContainer = ({ setSideBarContent }: SettingsContainerProps) => {
  return (
    <div className="flex-col justify-center gap-4 p-6">
      <TwButton
        variant="transparent"
        onClick={() => setSideBarContent("chats")}
        className="w-full flex gap-2"
      >
        <AiOutlineArrowLeft className="text-xl" />
        Settings
      </TwButton>
    </div>
  );
};

export default SettingsContainer;
