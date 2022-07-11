import {Profile, Chats} from './Components'

const SidebarContent = ({sidebarContent, setSideBarContent}) => {
  console.log(sidebarContent)
  return (
  	<div className="border-r border-muted/10 p-4 w-full sm:w-[38rem]">
      {sidebarContent === "profile" && <Profile />}
      {sidebarContent === "chats" && <Chats />}
  	</div>
  );
};
export default SidebarContent;
