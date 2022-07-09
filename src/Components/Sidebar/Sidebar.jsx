import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, UserTokenContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks/";

import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useContext(UserContext);
  const [userToken, setUserToken] = useContext(UserTokenContext);

  const [savedUserInfo, setSavedUserInfo] = useLocalStorage('userInfo', null);
  const [savedUserToken, setSavedUserToken] = useLocalStorage('userToken', '');
  const [keepSignedIn, setKeepSignedIn] = useLocalStorage('keepSignedIn', false);

  const handleLogOut = () => {
    setUserInfo(null);
    setSavedUserInfo(null);

    setUserToken("");
    setSavedUserToken('');

    setKeepSignedIn(false);
  }


  return (
    <nav className="hidden p-4 w-fit bg-gray-300 sm:flex sm:flex-col gap-4">
      {/*  <div className="mt-auto flex flex-col gap-4 items-center">
        <div className="p-6 bg-blue-600 rounded-full"></div>
        <button
          onClick={handleLogOut}
          className="p-2 w-fit bg-blue-600 text-white rounded"
        >
          <BiLogOut />
        </button>
      </div>*/}

      <div>
        <div className="flex gap-2 mt-auto">
          <div className="p-4 w-12 bg-blue-600 rounded-full"></div>
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
      </div>
    </nav>
  );
};

export default Sidebar;
