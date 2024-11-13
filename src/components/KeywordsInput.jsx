import React, { useState, useEffect } from "react";

const KeywordsInput = ({ label, value = [], placeholder, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    const inputValue = event.target.value.split(",").map((word) => word.trim());
    if (inputValue.length <= 3) {
      onChange(inputValue);
    }
  };
  useEffect(() => {
    if (!Array.isArray(value)) {
      console.warn(`${label} expects an array, received:`, value);
      onChange([]);
    }
  }, [value, onChange]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (value.length < 3) {
        onChange([...value, inputValue.trim()]);
        setInputValue("");
      } else {
        alert("You can only enter up to 3 keywords.");
      }
      event.preventDefault();
    }
  };

  const handleRemove = (indexToRemove) => {
    const newKeywords = value.filter((_, index) => index !== indexToRemove);
    onChange(newKeywords);
  };

  return (
    <div className="flex justify-between bg-gray-800 p-4 rounded-lg">
      <label className="text-lime-400 font-medium mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 items-center bg-gray-700 p-2 rounded">
        {value.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center bg-lime-400 text-black px-2 py-1 rounded-full"
          >
            <span className="mr-2">{keyword}</span>
            <button
              onClick={() => handleRemove(index)}
              className="font-bold hover:text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white outline-none"
          placeholder={value.length === 0 ? placeholder : ""}
        />
      </div>
    </div>
  );
};

export default KeywordsInput;
