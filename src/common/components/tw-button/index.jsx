const TwButton = ({children, isDisabled, addClass, clickHandler}) => {
	return (
        <button
        onClick={clickHandler || null}
        disabled={isDisabled ? true : false}
          className={`bg-primary-main hover:bg-primary-tinted duration-300
          	rounded-xl p-2 px-4 text-white ${addClass}`}
        >
          {children}
        </button>
		);
}

export default TwButton;