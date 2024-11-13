import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ notifications, toggleNotification, handleAcceptLike }) => {
  console.log(notifications)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h4 className="text-lg font-semibold">Notifications</h4>
          <button onClick={toggleNotification} className="text-red-500 hover:text-red-700">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className={`p-3 rounded-md shadow-sm flex justify-between items-center ${notification.accepted ? 'bg-green-100' : 'bg-gray-100'
                  }`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {notification.accepted ? `${notification.fromUser.name} accepted your like.` : `${notification.name} liked your profile.`}
                  </p>
                  <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
                </div>
                {notification.accepted ? (
                  <span className="ml-4 text-lime-500">
                    <i className="fas fa-comments"></i> {/* Chat icon */}
                  </span>
                ) : (
                  <button
                    onClick={() => handleAcceptLike(notification._id, index)}
                    className="ml-4 bg-lime-500 text-white px-2 py-1 text-xs rounded hover:bg-lime-600 transition"
                  >
                    Accept
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No new notifications</p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;
