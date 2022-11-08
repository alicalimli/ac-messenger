import { AnimatePresence, motion } from "framer-motion";
import { ChatsContainer } from "features/inbox";
import { VARIANTS_MANAGER } from "setup/variants-manager";
import SettingsContainer from "features/settings/SettingsContainer";
import { useAppSelector } from "hooks";
import { getSideContent } from "reducers/sideContentReducer";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "components";

const AddContacts = lazy(() => import("features/add-contacts/AddContacts"));

const NewGroupContainer = lazy(
  () => import("features/new-group/NewGroupContainer")
);
const ProfileContainer = lazy(
  () => import("features/profile/ProfileContainer")
);

interface SideContentProps {}

const SideContent = () => {
  const { content: sidebarContent } = useAppSelector(getSideContent);

  const SuspenseFallBack = (
    <div className="h-full w-full flex justify-center items-center">
      <LoadingSpinner msg="Loading..." />
    </div>
  );

  return (
    <aside className="relative border-r border-main w-full h-full md:w-32 md:min-w-[24rem] overflow-x-hidden">
      <Suspense fallback={SuspenseFallBack}>
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
      </Suspense>
    </aside>
  );
};
export default SideContent;
