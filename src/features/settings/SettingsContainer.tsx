import { useAppDispatch } from "app/hooks";
import { TwButton } from "components";
import { logout } from "features/authentication";
import { AiOutlineArrowLeft, AiOutlineLogout } from "react-icons/ai";

interface SettingsContainerProps {
  setSideBarContent: (state: string) => void;
}

const SettingsContainer = ({ setSideBarContent }: SettingsContainerProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex-col justify-center gap-4 p-6 ">
      <div className="border-b  border-muted-light/10 dark:border-muted-dark/10 pb-4">
        <TwButton
          variant="transparent"
          onClick={() => setSideBarContent("chats")}
          className="w-full flex gap-2"
        >
          <AiOutlineArrowLeft className="text-xl" />
          Setting
        </TwButton>
      </div>

      <div className="p-4 flex flex-col gap-1">
        <TwButton
          variant="transparent"
          className="relative group w-full"
          onClick={() => dispatch(logout())}
        >
          <AiOutlineLogout className="text-muted-light dark:text-muted-dark text-2xl" />
          Logout
        </TwButton>
      </div>
    </div>
  );
};

export default SettingsContainer;
