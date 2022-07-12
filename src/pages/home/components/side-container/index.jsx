import { Profile, Chats } from "./components";

import { motion, AnimatePresence } from "framer-motion";

const SidebarContent = ({ sidebarContent, setSideBarContent, previousContentRef }) => {
  return (
    <div className="relative border-r border-muted-light/10 dark:border-muted-dark/10 w-full sm:w-[38rem] overflow-x-hidden">
      <AnimatePresence>
        {sidebarContent === "chats" && (
          <motion.div
            key="chats"
            className="absolute w-full h-full"
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: "-50%" }}
            exit={{ opacity: 0, x: "50%" }}
            transition={{ type: "spring", mass: 0.25 }}
          >
            <Chats />
          </motion.div>
        )}
        {sidebarContent === "profile" && (
          <motion.div
            key="profile"
            className="absolute w-full h-full"
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: "-50%" }}
            exit={{ opacity: 0, x: "50%" }}
            transition={{ type: "spring", mass: 0.25 }}
          >
            <Profile previousContentRef={previousContentRef} setSideBarContent={setSideBarContent}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default SidebarContent;
