import { AnimatePresence, motion } from "framer-motion";
import { ChatsContainer } from "features/inbox";
import { ProfileContainer } from "features/profile";
import { AddContacts } from "features/add-contacts";
import { VARIANTS_MANAGER } from "setup/variants-manager";
import SettingsContainer from "features/settings/SettingsContainer";
import NewGroupContainer from "features/new-group/NewGroupContainer";
import { useAppSelector } from "hooks";
import { getSideContent } from "reducers/sideContentReducer";

interface SideContentProps {}

const SideContent = () => {
  const { content: sidebarContent } = useAppSelector(getSideContent);

  return (
    <aside className="relative border-r border-main w-full h-full md:w-32 md:min-w-[24rem] overflow-x-hidden">
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
            <AddContacts />
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
            <ProfileContainer />
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
            <SettingsContainer />
          </motion.div>
        )}
        {sidebarContent === "new-group" && (
          <motion.div
            key="add-contacts"
            className="absolute w-full h-full overflow-y-scroll scrollbar-hide"
            variants={VARIANTS_MANAGER}
            initial="slide-from-left"
            animate="slide-in"
            exit="slide-from-right"
          >
            <NewGroupContainer />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
export default SideContent;
