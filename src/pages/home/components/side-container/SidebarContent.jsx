import { useState } from "react";

import { Profile, Chats } from "./components";

import { motion, AnimatePresence } from "framer-motion";

import { VARIANTS_MANAGER } from "/src/setup/variants-manager";

const SidebarContent = ({
  sidebarContent,
  setSideBarContent,
  previousContentRef,
}) => {
  return (
    <section className="relative border-r border-muted-light/10 dark:border-muted-dark/10 w-full sm:w-[38rem] overflow-x-hidden">
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
            <Chats />
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
            <Profile
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
