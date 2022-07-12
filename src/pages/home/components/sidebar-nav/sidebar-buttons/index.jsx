const SidebarBtn = ({ children, clickHandler, name }) => {
  return (
    <button
      onClick={clickHandler}
      className="relative p-2 text-muted-light dark:text-muted-dark text-2xl group hover:bg-muted-light/10 dark:hover:bg-muted-dark/10 rounded-xl duration-200"
    >
      {children}
    </button>
  );
};

export default SidebarBtn;
