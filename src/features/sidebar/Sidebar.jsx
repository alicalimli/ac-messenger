import {
  BiLogOut,
  BiUser,
  BiMessageSquareDetail,
  BiMoon,
  BiSun,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { RiContactsLine } from "react-icons/ri";

import { TwTooltip, TwButton } from "/src/components";
import { useSignOut } from "/src/hooks";

import { useDispatch, useSelector } from "react-redux";
import { toggleDarkmode } from "./theme";

const SIDEBAR_PAGE_BUTTONS = [
  { name: "chats", icon: BiMessageSquareDetail },
  { name: "add contacts", icon: RiContactsLine },
  { name: "profile", icon: BiUser },
  { name: "settings", icon: FiSettings },
];

const Sidebar = ({ setSideBarContent }) => {
  const darkmode = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const signOut = useSignOut();

  const changeSideContent = (sideContentName) => {
    sideContentName = sideContentName.replace(" ", "");
    setSideBarContent(sideContentName);
  };

  const darkmodeClickHandler = () => dispatch(toggleDarkmode());

  return (
    <nav className="relative hidden p-4 w-fit  bg-muted-light/5 dark:bg-muted-dark/5 md:flex md:flex-col gap-4 justify-center">
      <div className="flex flex-col gap-2 items-center">
        {SIDEBAR_PAGE_BUTTONS.map((obj) => {
          const Icon = obj.icon;
          return (
            <TwButton
              variant="transparent"
              className="relative group z-10"
              key={obj.name}
              onClick={() => changeSideContent(obj.name)}
            >
              <Icon className="text-muted-light dark:text-muted-dark text-2xl" />
              <TwTooltip tip={obj.name} position="right" />
            </TwButton>
          );
        })}
      </div>

      <div className="absolute bottom-4 flex flex-col gap-1">
        <TwButton
          variant="transparent"
          className="relative group z-10"
          onClick={darkmodeClickHandler}
        >
          {darkmode ? (
            <BiSun className="text-muted-light dark:text-muted-dark text-2xl" />
          ) : (
            <BiMoon className="text-muted-light dark:text-muted-dark text-2xl" />
          )}
          <TwTooltip tip="toggle darkmode" position="right"></TwTooltip>
        </TwButton>

        <TwButton
          variant="transparent"
          className="relative group z-10"
          onClick={signOut}
        >
          <BiLogOut className="text-muted-light dark:text-muted-dark text-2xl" />
          <TwTooltip tip="logout" position="right" />
        </TwButton>
      </div>
    </nav>
  );
};

export default Sidebar;
