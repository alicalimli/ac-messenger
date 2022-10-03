import { useAppDispatch, useAppSelector } from "app/hooks";
import { TwButton } from "components";
import { logout } from "features/authentication";
import { toggleDarkmode } from "features/sidebar";
import { getThemeState } from "features/sidebar/themeSlice";
import { AiOutlineArrowLeft, AiOutlineLogout } from "react-icons/ai";
import { HiOutlineMoon } from "react-icons/hi";

interface SettingsContainerProps {
  setSideBarContent: (state: string) => void;
}

const SettingsContainer = ({ setSideBarContent }: SettingsContainerProps) => {
  const dispatch = useAppDispatch();
  const { darkmode } = useAppSelector(getThemeState);

  return (
    <div className="flex-col justify-center gap-4 p-1 py-6">
      <div className="border-b  border-muted-light/10 dark:border-muted-dark/10 pb-4">
        <TwButton
          variant="transparent"
          onClick={() => setSideBarContent("chats")}
          className="w-full flex gap-2"
        >
          <AiOutlineArrowLeft className="text-xl" />
          Settings
        </TwButton>
      </div>

      <div className="p-2 flex flex-col gap-1">
        <TwButton
          variant="transparent"
          className="relative group w-full"
          onClick={() => dispatch(toggleDarkmode())}
        >
          <HiOutlineMoon className="text-muted-light dark:text-muted-dark text-2xl" />
          Darkmode
          <p className="text-muted-light dark:text-muted-dark ml-auto">
            {darkmode ? "on" : "off"}
          </p>
        </TwButton>
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
