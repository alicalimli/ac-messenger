import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

import { UserContext, UserTokenContext } from "../../../Contexts";
import { useLocalStorage } from "../../../Hooks/";

import SidebarBtn from "./SidebarBtn/SidebarBtn";

const Sidebar = ({setSideBarContent}) => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage("userInfo", null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage("userToken", "");
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  const handleLogOut = () => {
    setUserInfo(null);
    setSavedUserInfo(null);

    setUserToken("");
    setSavedUserToken("");

    setKeepSignedIn(false);
  };

  return (
    <nav className="hidden p-4 w-fit  bg-muted/5  sm:flex sm:flex-col gap-4 justify-center">
      <div className="flex flex-col gap-2 items-center">
        <SidebarBtn clickHandler={()=> setSideBarContent('chats')} name="chats">
          <BiMessageSquareDetail />
        </SidebarBtn>
        <SidebarBtn clickHandler={()=> setSideBarContent('profile')} name="profile">
          <AiOutlineUser />
        </SidebarBtn>
        <SidebarBtn clickHandler={()=> setSideBarContent('settings')} name="settings">
          <FiSettings />
        </SidebarBtn>
      </div>
      <SidebarBtn clickHandler={handleLogOut} name="logout">
        <BiLogOut />
      </SidebarBtn>
    </nav>
  );
};

export default Sidebar;
