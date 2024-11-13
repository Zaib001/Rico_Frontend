import React from "react";

const RangeSlider = ({ label, value, min, max, step, options = [], onChange }) => (
  <div className="flex flex-col bg-gray-800 p-4 rounded-lg">
    <label className="text-lime-400 font-medium mb-2">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full"
    />
    <div className="flex justify-between text-white text-[10px] mt-2">
      {options.map((option, index) => (
        <span key={index}>{option}</span>
      ))}
    </div>
  </div>
);

export default RangeSlider;
