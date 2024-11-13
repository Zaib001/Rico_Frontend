// src/components/SingleValueInput.jsx
import React from "react";
import PropTypes from "prop-types";

const SingleValueInput = ({ label, min, max, value, onChange }) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || (Number(newValue) >= min && Number(newValue) <= max)) {
      onChange(Number(newValue)); // Ensure that the value is passed as a number
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lime-400 font-semibold">{label}</label>
      <input
        type="number"
        min={min}
        max={max}
        value={value || ""} // Ensure value is not `undefined`
        onChange={handleInputChange}
        className="border text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-sm text-gray-500">
        {`Select a value between ${min} and ${max}`}
      </p>
    </div>
  );
};

SingleValueInput.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SingleValueInput;
