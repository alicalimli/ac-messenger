import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks/";

import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);

  const [userToken, setUserToken] = useLocalStorage("userToken", "");
  const handleLogOut = () => {
    setUser({});
    setUserToken("");
    navigate("/login");
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
        <div className="flex gap-2 mt-auto">
          <div className="p-4 w-12 bg-blue-600 rounded-full"></div>
          <div className="flex flex-col">
            <p className="text-lg text-black font-semibold">{user.userName}</p>
            <p className="text-sm text-slate-500">{user.userEmail}</p>
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
