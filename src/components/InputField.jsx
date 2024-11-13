import React from 'react'

const InputField = ({ label, value, placeholder, onChange }) => (
    <div className="flex items-center justify-between bg-gray-800 p-3 md:p-4 rounded-lg">
      <span className="font-medium text-sm md:text-base text-lime-400">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-700 text-white rounded p-2"
      />
    </div>
  );

export default InputField
