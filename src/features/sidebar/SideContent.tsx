import { AnimatePresence, motion } from "framer-motion";
import { ChatsContainer } from "features/inbox";
import { ProfileContainer } from "features/profile";
import { AddContacts } from "features/add-contacts";
import { VARIANTS_MANAGER } from "setup/variants-manager";
import SettingsContainer from "features/settings/SettingsContainer";

interface SideContentProps {
  sidebarContent: string;
  setSideBarContent: (state: string) => void;
}

const SideContent = ({
  sidebarContent,
  setSideBarContent,
}: SideContentProps) => {
  return (
    <section className="relative border-r border-muted-light/10 dark:border-muted-dark/10 w-full h-full md:w-32 md:min-w-[24rem] overflow-x-hidden">
      <AnimatePresence>
        {sidebarContent === "chats" && (
          <motion.div
            key="chats"
            className="absolute w-full h-full overflow-hidden"
            variants={VARIANTS_MANAGER}
            initial="slide-from-left"
            animate="slide-in"
            exit="slide-from-right"
          >
            <ChatsContainer />
          </motion.div>
        )}
        {sidebarContent === "addcontacts" && (
          <motion.div
            key="add-contacts"
            className="absolute w-full h-full overflow-hidden"
            variants={VARIANTS_MANAGER}
            initial="slide-from-left"
            animate="slide-in"
            exit="slide-from-right"
          >
            <AddContacts setSideBarContent={setSideBarContent} />
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
        {sidebarContent === "settings" && (
          <motion.div
            key="add-contacts"
            className="absolute w-full h-full"
            variants={VARIANTS_MANAGER}
            initial="slide-from-left"
            animate="slide-in"
            exit="slide-from-right"
          >
            <SettingsContainer setSideBarContent={setSideBarContent} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default SideContent;
