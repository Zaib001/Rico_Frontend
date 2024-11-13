import React from "react";

const InputSelect = ({ label, value, options, onChange }) => (
  <div className="flex items-center justify-between bg-gray-800 p-3 md:p-4 rounded-lg">
    <span className="font-medium text-sm md:text-base text-lime-400">{label}</span>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-700 text-white rounded p-2"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default InputSelect;
