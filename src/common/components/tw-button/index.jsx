const TwButton = ({children, isDisabled, addClasses}) => {
	return (
        <button
        disabled={isDisabled ? true : false}
          className={`bg-primary-main hover:bg-primary-tinted duration-300
          	rounded-xl p-2 px-4 text-white ${addClasses}`}
        >
        {console.log(isDisabled)}
          {children}
        </button>
		);
}

export default TwButton;