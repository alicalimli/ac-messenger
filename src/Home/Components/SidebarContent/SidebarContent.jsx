import {Profile, Chats} from './Components'

import {motion,AnimatePresence} from 'framer-motion'

const SidebarContent = ({sidebarContent, setSideBarContent}) => {
  console.log(sidebarContent)
  return (
  	<div className="relative border-r border-muted-light/10 dark:border-muted-dark/10 w-full sm:w-[38rem] overflow-x-hidden">

      <AnimatePresence>
        {sidebarContent === "profile" &&
        <motion.div
        className="absolute w-full h-full"
        animate={{opacity:1, x:0}}
        initial={{opacity:0, x:'50%'}}
        exit={{opacity:0, x:'-50%'}}
        transition={{duration:0.2}}
        >
          <Profile />
        </motion.div>
      }
      </AnimatePresence>

      <AnimatePresence>
        {sidebarContent === "chats" &&
        <motion.div
        className="absolute w-full h-full"
        animate={{opacity:1, x:0}}
        initial={{opacity:0, x:'50%'}}
        exit={{opacity:0, x:'-50%'}}
        transition={{duration:0.2}}
        >
          <Chats />
        </motion.div>
      }
      </AnimatePresence>
  	</div>
  );
};
export default SidebarContent;
