import React, { useState, useEffect } from "react";

const InputMultiSelect = ({ label, value = [], options, onChange }) => {
  // Ensure that the initial value is always an array
  const [selectedOptions, setSelectedOptions] = useState(Array.isArray(value) ? value : []);

  useEffect(() => {
    // Update local state if the incoming `value` prop changes
    if (Array.isArray(value)) {
      setSelectedOptions(value);
    }
  }, [value]);

  const handleSelect = (option) => {
    if (!selectedOptions.includes(option)) {
      const newSelected = [...selectedOptions, option].slice(0, 7); // Limit to 7 for match-building
      setSelectedOptions(newSelected);
      onChange(newSelected);
    }
  };

  const handleRemove = (option) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <label className="text-center block text-lime-400 font-medium mb-2">{label}</label>

      {/* Render Selected Options with Cross Icon */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedOptions.map((option) => (
          <span
            key={option}
            className="bg-lime-400 text-black px-3 py-1 rounded-full flex items-center"
          >
            {option}
            <button
              className="ml-2 text-black font-bold"
              onClick={() => handleRemove(option)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Dropdown to Select Options */}
      <select
        value=""
        onChange={(e) => handleSelect(e.target.value)}
        className="bg-gray-700 text-white p-2 rounded w-full"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options
          .filter((option) => !selectedOptions.includes(option))
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default InputMultiSelect;
