import { useContext } from "react";

import { UserContext, UserTokenContext } from "../../../../../Contexts";

const Profile = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (
    <div className="bg-white p-4 flex flex-col">
      <h1 className="text-2xl">Profile</h1>
      <div className="flex items-center gap-4 mt-5">
        <div className="p-2 w-16 h-16 rounded-full bg-white shadow">
          <img className="w-full bg-cover bg-center " src={userInfo.profile} />
        </div>
        <div className="flex flex-col ">
          <h2 className="text-lg">{userInfo.username}</h2>
          <p className="text-muted text-sm">{userInfo.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
