// components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-lime-400 border-opacity-75"></div>
    </div>
  );
};

export default Loader;
