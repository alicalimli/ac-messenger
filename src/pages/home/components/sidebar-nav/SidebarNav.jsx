import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

import {
  UserContext,
  UserTokenContext,
} from "/src/setup/app-context-manager";

import { useLocalStorage } from "/src/common/hooks";
import { TwTrnButton, TwTooltip } from "/src/common/components";

const SidebarNav = ({
  sidebarContent,
  setSideBarContent,
  previousContentRef,
}) => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  const sidebarButtons = [
    { name: "chats", icon: BiMessageSquareDetail },
    { name: "profile", icon: AiOutlineUser },
    { name: "settings", icon: FiSettings },
  ];

  const handleLogOut = () => {
    setUserInfo(null);
    setSavedUserInfo(null);

    setUserToken("");
    setSavedUserToken("");

    setKeepSignedIn(false);
  };

  const changeSideContent = (sideContentName) => {
    previousContentRef.current = sidebarContent;
    setSideBarContent(sideContentName);
  };

  return (
    <nav className="hidden p-4 w-fit  bg-muted-light/5 dark:bg-muted-dark/5 sm:flex sm:flex-col gap-4 justify-center">
      <div className="flex flex-col gap-2 items-center">
        {sidebarButtons.map((obj) => {
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

      <TwTrnButton addClass="relative group z-10" clickHandler={handleLogOut}>
        <BiLogOut className="text-muted-light dark:text-muted-dark text-2xl" />
        <TwTooltip position="right">logout</TwTooltip>
      </TwTrnButton>
    </nav>
  );
};

export default SidebarNav;
