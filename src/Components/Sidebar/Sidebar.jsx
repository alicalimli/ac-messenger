import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

import { UserContext, UserTokenContext } from "../../Contexts";
import { useLocalStorage } from "../../Hooks/";

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
      </div>
    </nav>
  );
};

export default Sidebar;
