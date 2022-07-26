import { AnimatePresence, motion } from "framer-motion";
import { Chats } from "./components";
import { ProfileContainer } from "/src/features/profile/components";

import { useGetInboxList } from "/src/hooks";
import { VARIANTS_MANAGER } from "/src/setup/variants-manager";

const SidebarContent = ({
  sidebarContent,
  setSideBarContent,
  previousContentRef,
}) => {
  const inboxLists = useGetInboxList();

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
            <Chats inboxLists={inboxLists} />
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
            <ProfileContainer
              previousContentRef={previousContentRef}
              setSideBarContent={setSideBarContent}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default SidebarContent;
