// src/components/BasicDetailsForm.jsx
import React, { useState, useEffect } from "react";
import { useFilterContext } from "../context/FilterContext";
import { useProfileContext } from "../context/ProfileContext";
import InputMultiSelect from "./InputMultiSelect";
import InputSelect from "./InputSelect";
import InputField from "./InputField";
import RangeSlider from "./RangeSlider";
import KeywordsInput from "./KeywordsInput";

const BasicDetails = ({ isMatchBuilding = false }) => {
  const { updateFilter, filters } = useFilterContext();
  const { profileData, updateProfile } = useProfileContext();

  // State management
  const [religion, setReligion] = useState(
    profileData.basicDetails?.religion || (isMatchBuilding ? [] : "Agnostic")
  );
  const [education, setEducation] = useState(
    profileData.basicDetails?.education || (isMatchBuilding ? [] : "")
  );
  const [languagesSpoken, setLanguagesSpoken] = useState(
    profileData.basicDetails?.languagesSpoken || (isMatchBuilding ? [] : [])
  );
  const [keywords, setKeywords] = useState(
    Array.isArray(profileData.basicDetails?.keywords)
      ? profileData.basicDetails.keywords
      : []
  );
  const [zipCode, setZipCode] = useState(
    profileData.basicDetails?.zipCode || "29730"
  );
  const [distance, setDistance] = useState(5);

  // Handlers
  const handleChange = (field, value) => {
    console.log(`Updating ${field}:`, value); // Debugging
    updateFilter("basicDetails", { ...filters.basicDetails, [field]: value });
    updateProfile("basicDetails", { ...profileData.basicDetails, [field]: value });
  };

  const handleEducationChange = (value) => {
    if (value.length <= (isMatchBuilding ? 8 : 2)) {
      setEducation(value);
      handleChange("education", value);
    }
  };

  const handleLanguagesChange = (value) => {
    if (Array.isArray(value) && value.every(lang => validLanguages.includes(lang))) {
      setLanguagesSpoken(value);
      handleChange("languagesSpoken", value);
    } else {
      console.error("Invalid languages selected:", value);
    }
  };

  const handleReligionChange = (value) => {
    const newReligion = isMatchBuilding ? value : value[0];
    setReligion(newReligion);
    handleChange("religion", newReligion);
  };

  const validLanguages = [
    "Egyptian Arabic", "English", "French", "Haitian Creole", "Italian",
    "Jamaican/Patois/Patwa", "Japanese", "Korean", "Mandarin Chinese",
    "Other", "Russian", "Spanish", "Vietnamese"
  ];

  return (
    <>
      {/* Religion: InputSelect for profile, InputMultiSelect for match */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Religion"
          value={religion}
          options={[
            "Agnostic", "Atheist", "Christianity", "Islam",
            "Nonreligious", "Other", "Spiritual"
          ]}
          onChange={handleReligionChange}
          isMultiple
        />
      ) : (
        <InputSelect
          label="Religion"
          value={religion}
          options={[
            "Agnostic", "Atheist", "Christianity", "Islam",
            "Nonreligious", "Other", "Spiritual"
          ]}
          onChange={(value) => handleReligionChange([value])}
        />
      )}

      {/* Education */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Education"
          value={education}
          options={[
            "Associate’s degree", "Autodidactic in Specialized Area",
            "Bachelor’s degree", "Doctoral degree", "High school",
            "Master’s degree", "Middle school", "Some college"
          ]}
          onChange={handleEducationChange}
          isMultiple
        />
      ) : (
        <InputSelect
          label="Education"
          value={education}
          options={[
            "Associate’s degree", "Autodidactic in Specialized Area",
            "Bachelor’s degree", "Doctoral degree", "High school",
            "Master’s degree", "Middle school", "Some college"
          ]}
          onChange={(value) => handleChange("education", value)}
        />
      )}

      {/* Languages Spoken */}
      <InputMultiSelect
        label="Languages Spoken"
        value={languagesSpoken}
        options={validLanguages}
        onChange={handleLanguagesChange}
        isMultiple={!isMatchBuilding}
      />

      {/* Keywords Input */}
      <KeywordsInput
        label="Keywords"
        value={keywords}
        placeholder="Enter up to 3 keywords"
        onChange={(newKeywords) => {
          setKeywords(newKeywords);
          handleChange("keywords", newKeywords);
        }}
      />

      {/* Zip Code Input */}
      <InputField
        label="Zip Code"
        value={zipCode}
        placeholder="Enter zip code"
        onChange={(value) => {
          setZipCode(value);
          handleChange("zipCode", value);
        }}
      />

      {/* Distance Slider for Match Building */}
      {isMatchBuilding && (
        <RangeSlider
          label="Distance"
          value={distance}
          min={5}
          max={100}
          step={5}
          options={[
            "5 miles", "25 miles", "50 miles", "100 miles",
            "USA ONLY", "Worldwide"
          ]}
          onChange={(value) => {
            setDistance(value);
            handleChange("distance", value);
          }}
        />
      )}
    </>
  );
};

export default BasicDetails;
