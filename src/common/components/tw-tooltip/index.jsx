import {useReducer, useEffect} from 'react'


const TwTooltip = ({ children, addClass, position }) => {

	return (
		<span className="absolute shadow-md bg-gray-800 dark:bg-white text-white dark:text-black rounded-xl p-2 px-4 text-sm invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200 -right-4 top-1/2 translate-x-full -translate-y-1/2 z-10">
			{children}
		</span>
	);
};

export default TwTooltip;
