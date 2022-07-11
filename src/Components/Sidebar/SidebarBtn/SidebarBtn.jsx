const SidebarBtn = ({ children, clickHandler, name }) => {
	return (
		<button
			onClick={clickHandler}
			className="relative p-2 text-muted text-2xl group hover:bg-muted/10 rounded-xl duration-200"
		>
			{children}
			<span className="absolute shadow-md bg-gray-800 text-white rounded-xl p-2 px-4 text-sm invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200 -right-4 top-1/2 translate-x-full -translate-y-1/2">
				{name}
			</span>
		</button>
	);
};

export default SidebarBtn;
