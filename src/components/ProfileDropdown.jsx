import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
const ProfileDropdown = ({ isDropdownOpen, toggleProfileCreation, handleLogout }) => {
  return (
    <AnimatePresence>
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-44 bg-gray-800 text-white rounded-lg shadow-lg profile-dropdown"
        >
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={toggleProfileCreation}
          >
            Create Profile
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
            <Link to='/match'>Build Matches</Link>
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;
