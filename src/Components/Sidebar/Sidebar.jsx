import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks/";

const Sidebar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);

  const [userData, setUserData] = useLocalStorage("userToken", {});

  const handleLogOut = () => {
    setUser({});
    setUserToken({});
    navigate("/login");
    console.log(user);
  };

  return (
    <nav className="p-4 w-72 bg-gray-300 flex flex-col gap-4">
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
    </nav>
  );
};

export default Sidebar;
