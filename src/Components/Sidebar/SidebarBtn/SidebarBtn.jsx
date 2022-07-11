const SidebarBtn = ({children, clickHandler}) => {
	return(
		<button onClick={clickHandler} className="p-2 text-muted text-2xl rounded">
          {children}
        </button>
		);
}

export default SidebarBtn;