const TwTrnButton = ({children, isDisabled, addClass}) => {
	return (
        <button
        disabled={isDisabled ? true : false}
        className={`flex gap-4 items-center text-lg hover:bg-muted-light/10 p-2 text-md rounded-xl dark:hover:bg-muted-dark/10 duration-200 text-black dark:text-white ${addClass}`}>
        {children}
        </button>
		);
}

export default TwTrnButton;