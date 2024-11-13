import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCreation from "../pages/ProfileCreationPage"; // Import the ProfileCreation form

const ProfileCreationModal = ({ isProfileCreationOpen, profileCreationRef }) => {
  return (
    <AnimatePresence>
      {isProfileCreationOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 profile-creation-modal"
        >
          <motion.div
            ref={profileCreationRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-3xl overflow-y-auto"
            style={{ maxHeight: "100vh" }}
          >
            <ProfileCreation />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileCreationModal;
