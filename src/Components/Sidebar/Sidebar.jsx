import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

import { UserContext, UserTokenContext } from "../../Contexts";
import { useLocalStorage } from "../../Hooks/";

import SidebarBtn from "./SidebarBtn/SidebarBtn";

const Sidebar = () => {
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
    <nav className="hidden p-4 w-fit sm:flex sm:flex-col gap-4 justify-center">
      <div className="flex flex-col gap-2 items-center">
        <SidebarBtn clickHandler={handleLogOut}>
          <BiMessageSquareDetail />
        </SidebarBtn>
        <SidebarBtn clickHandler={handleLogOut}>
          <AiOutlineUser />
        </SidebarBtn>
        <SidebarBtn clickHandler={handleLogOut}>
          <FiSettings />
        </SidebarBtn>
      </div>
      <SidebarBtn clickHandler={handleLogOut}>
        <BiLogOut />
      </SidebarBtn>

      {/*      <div>
        <div className="flex flex-wrap gap-2 mt-auto">
          <div className="p-2 w-12 h-12 rounded-full bg-white">
             <img
              className="w-full bg-cover bg-center "
              src={userInfo.profile}
              />
          </div>
           <img
              className="w-full bg-cover bg-center bg-white "
              style={{backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=740")`}}
              />
          <div className="flex flex-col">
            <p className="text-lg text-black font-semibold">
              {userInfo.username}
            </p>
            <p className="text-sm text-slate-500">{userInfo.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="p-2 px-4 bg-blue-600 text-white rounded"
        >
          Logout
        </button>
      </div>*/}
    </nav>
  );
};

export default Sidebar;
