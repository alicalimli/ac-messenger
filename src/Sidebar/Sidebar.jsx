const Sidebar = () => {
	return (
		<nav className="p-4 w-72 bg-gray-300">
			<div className="flex gap-2">
				<div className="p-4 w-12 bg-red-600 rounded-full"></div>
				<div className="flex flex-col">
					<p className="text-lg text-black font-semibold">ali_dev</p>
					<p className="text-sm text-slate-500">alicalimli76@gmail.com</p>
				</div>
			</div>
		</nav>
		);
}

export default Sidebar;