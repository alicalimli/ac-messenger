import { useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut, BiMessageSquareDetail, BiMoon, BiSun } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

import {
  DarkmodeContext,
  UserContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import { TwTooltip, TwTrnButton } from "/src/components";
import { useLocalStorage, useSignOut } from "/src/hooks";

const SIDEBAR_PAGE_BUTTONS = [
  { name: "chats", icon: BiMessageSquareDetail },
  { name: "profile", icon: AiOutlineUser },
  { name: "settings", icon: FiSettings },
];

const Sidebar = ({
  sidebarContent,
  setSideBarContent,
  previousContentRef,
}) => {
  const [darkmode, setDarkmode] = useContext(DarkmodeContext);

  const signOut = useSignOut();

  const changeSideContent = (sideContentName) => {
    previousContentRef.current = sidebarContent;
    setSideBarContent(sideContentName);
  };

  return (
    <nav className="relative hidden p-4 w-fit  bg-muted-light/5 dark:bg-muted-dark/5 sm:flex sm:flex-col gap-4 justify-center">
      <div className="flex flex-col gap-2 items-center">
        {SIDEBAR_PAGE_BUTTONS.map((obj) => {
          const Icon = obj.icon;
          return (
            <TwTrnButton
              addClass="relative group z-10"
              key={obj.name}
              clickHandler={() => changeSideContent(obj.name)}
            >
              <Icon className="text-muted-light dark:text-muted-dark text-2xl" />
              <TwTooltip position="right">{obj.name}</TwTooltip>
            </TwTrnButton>
          );
        })}
      </div>

      <div className="absolute bottom-4 flex flex-col gap-1">
        <TwTrnButton
          addClass="relative group z-10"
          clickHandler={() => setDarkmode(!darkmode)}
        >
          {darkmode ? (
            <BiSun className="text-muted-light dark:text-muted-dark text-2xl" />
          ) : (
            <BiMoon className="text-muted-light dark:text-muted-dark text-2xl" />
          )}
          <TwTooltip position="right">darkmode</TwTooltip>
        </TwTrnButton>

        <TwTrnButton addClass="relative group z-10" clickHandler={signOut}>
          <BiLogOut className="text-muted-light dark:text-muted-dark text-2xl" />
          <TwTooltip position="right">logout</TwTooltip>
        </TwTrnButton>
      </div>
    </nav>
  );
};

export default Sidebar;
