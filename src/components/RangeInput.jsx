// src/components/RangeInput.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

const RangeInput = ({ label, min, max, value, onChange, isRange = false }) => {
  const [rangeValue, setRangeValue] = useState(
    isRange ? [value[0] || min, value[1] || max] : value
  );

  const handleChange = (e, index) => {
    const newValue = isRange ? [...rangeValue] : Number(e.target.value);

    if (isRange) {
      newValue[index] = Number(e.target.value);
      if (newValue[0] <= newValue[1]) {
        setRangeValue(newValue);
        onChange(newValue);
      }
    } else {
      setRangeValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-lime-400 font-semibold">{label}</label>
      {isRange ? (
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <input
              type="range"
              min={min}
              max={max}
              value={rangeValue[0]}
              onChange={(e) => handleChange(e, 0)}
              className="slider"
              style={{ width: "100%", height: "10px", backgroundColor: "#32CD32" }}
            />
            <span className="text-sm text-gray-500">{rangeValue[0]}</span>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="range"
              min={min}
              max={max}
              value={rangeValue[1]}
              onChange={(e) => handleChange(e, 1)}
              className="slider"
              style={{ width: "100%", height: "10px", backgroundColor: "#32CD32" }}
            />
            <span className="text-sm text-gray-500">{rangeValue[1]}</span>
          </div>
        </div>
      ) : (
        <div className="">
        <span className="text-sm flex justify-end text-gray-500">{rangeValue}</span>

          <input
            type="range"
            min={min}
            max={max}
            value={rangeValue}
            onChange={handleChange}
            className="slider"
            style={{ width: "100%", backgroundColor: "#a3e635" }}
          />
        </div>
      )}
      <p className="text-sm text-gray-500">
        {isRange
          ? `Select a range between ${min} and ${max}`
          : `Select a value between ${min} and ${max}`}
      </p>
    </div>
  );
};

RangeInput.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  isRange: PropTypes.bool,
};

export default RangeInput;
