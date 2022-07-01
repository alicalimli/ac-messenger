import {useContext} from 'react'

import {UserContext} from '../UserContextProvider/UserContextProvider'

const Sidebar = () => {
  const user = useContext(UserContext);
  console.log(user[0])
  return (
    <nav className="p-4 w-72 bg-gray-300">
      <div className="flex gap-2">
        <div className="p-4 w-12 bg-red-600 rounded-full"></div>
        <div className="flex flex-col">
          <p className="text-lg text-black font-semibold">{user[0].userName}</p>
          <p className="text-sm text-slate-500">{user[0].userEmail}</p>
        </div>
      </div>
        <button className="p-2 px-4 bg-blue-600 text-white rounded">Logout</button>
    </nav>
  );
};

export default Sidebar;
