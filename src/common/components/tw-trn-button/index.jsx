import {motion} from 'framer-motion'

const TwTrnButton = ({children, isDisabled, addClass, clickHandler}) => {
	return (
        <motion.button
        whileHover={{scale:1.03}}
        whileTap={{scale:0.98}}
        onClick={clickHandler || null}
        disabled={isDisabled ? true : false}
        className={`flex gap-4 items-center text-lg hover:bg-muted-light/10 p-2 text-md rounded-xl dark:hover:bg-muted-dark/10 text-black dark:text-white ${addClass}`}>
        {children}
        </motion.button>
		);
}

export default TwTrnButton;