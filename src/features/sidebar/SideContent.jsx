import { AnimatePresence, motion } from "framer-motion";
import { ChatsContainer } from "/src/features/inbox";
import { ProfileContainer } from "/src/features/profile";
import { AddContacts } from "/src/features/add-contacts";
import { VARIANTS_MANAGER } from "/src/setup/variants-manager";

const SideContent = ({ sidebarContent, setSideBarContent }) => {
  return (
    <section className="relative border-r border-muted-light/10 dark:border-muted-dark/10 w-full md:w-32 md:min-w-[24rem] overflow-x-hidden">
      <AnimatePresence>
        {sidebarContent === "chats" && (
          <motion.div
            key="chats"
            className="absolute w-full h-full"
            variants={VARIANTS_MANAGER}
            initial="slide-from-left"
            animate="slide-in"
            exit="slide-from-right"
          >
            <ChatsContainer />
          </motion.div>
        )}
        {sidebarContent === "profile" && (
          <motion.div
            key="profile"
            className="absolute w-full h-full"
            variants={VARIANTS_MANAGER}
            initial="slide-from-left"
            animate="slide-in"
            exit="slide-from-right"
          >
            <ProfileContainer setSideBarContent={setSideBarContent} />
          </motion.div>
        )}
        {sidebarContent === "addcontacts" && (
          <motion.div
            key="add-contacts"
            className="absolute w-full h-full"
            variants={VARIANTS_MANAGER}
            initial="slide-from-left"
            animate="slide-in"
            exit="slide-from-right"
          >
            <AddContacts setSideBarContent={setSideBarContent} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default SideContent;
