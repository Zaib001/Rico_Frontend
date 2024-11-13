import React, { useEffect, useState } from "react";
import { useFilterContext } from "../context/FilterContext";
import { useProfileContext } from "../context/ProfileContext";
import RangeInput from "./RangeInput";
import InputSelect from "./InputSelect";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import am1 from '../assets/Athletic Men/5ee72351f0354949b1f24efdaf1a80193f7afe269c472961a0211af9b14e5708.png'

// Placeholder images for demonstration
const skinToneImagesMale = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `https://via.placeholder.com/100?text=Male${i + 1}`,
  label: `Male${i + 1}`,
}));

const skinToneImagesFemale = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `https://via.placeholder.com/100?text=Female${i + 1}`,
  label: `Female${i + 1}`,
}));

const bodyTypeImages = [
  { id: 1, src: "am1", label: "Slim" },
  { id: 2, src: "https://via.placeholder.com/100", label: "Curvy" },
  { id: 3, src: "https://via.placeholder.com/100", label: "Athletic" },
  { id: 4, src: "https://via.placeholder.com/100", label: "Muscular" },
];

const HumanDesign = ({ isMatchBuilding = false }) => {
  const { filters, updateFilter } = useFilterContext();
  const { profileData, updateProfile } = useProfileContext();

  // State management
  const [gender, setGender] = useState(profileData.humanDesign?.gender || "");
  const [race, setRace] = useState(profileData.humanDesign?.race || []);
  const [skinTone, setSkinTone] = useState(profileData.humanDesign?.skinTone || (isMatchBuilding ? [] : ""));
  const [bodyType, setBodyType] = useState(profileData.humanDesign?.bodyType || []);
  const [age, setAge] = useState(profileData.humanDesign?.age || (isMatchBuilding ? [18, 30] : 18));
  const [height, setHeight] = useState(profileData.humanDesign?.height || (isMatchBuilding ? [60, 70] : 60));
  const [weight, setWeight] = useState(profileData.humanDesign?.weight || (isMatchBuilding ? [120, 180] : 120));
  const [sexOrientation, setSexOrientation] = useState(profileData.humanDesign?.sexOrientation || "STRAIGHT");

  // Handle changes to update context
  const handleUpdate = (field, value) => {
    updateFilter("humanDesign", { ...filters.humanDesign, [field]: value });
    updateProfile("humanDesign", { ...profileData.humanDesign, [field]: value });
  };

  useEffect(() => {
    handleUpdate("gender", gender);
    handleUpdate("race", race);
    handleUpdate("skinTone", skinTone);
    handleUpdate("bodyType", bodyType);
    handleUpdate("age", age);
    handleUpdate("height", height);
    handleUpdate("weight", weight);
    handleUpdate("sexOrientation", sexOrientation);
  }, [gender, race, skinTone, bodyType, age, height, weight, sexOrientation]);

  // Select correct skin tones based on gender
  const skinToneOptions = gender === "Natural Male" || gender === "Trans Male" ? skinToneImagesMale : skinToneImagesFemale;

  return (
    <div className="space-y-6">
      {/* Gender */}
      <InputSelect
        label="Gender"
        value={gender}
        options={["Natural Male", "Natural Female", "Trans Female", "Trans Male"]}
        onChange={(value) => {
          setGender(value);
          handleUpdate("gender", value);
        }}
        disabled={!isMatchBuilding}
      />

      {/* Race */}
      <InputSelect
        label="Race"
        value={race[0] || ""}
        options={[
          "African/Black",
          "Asian",
          "Caucasian/White",
          "Hispanic/Latino",
          "Mixed/Multiracial",
          "Native American/Indigenous",
          "Other",
          "Pacific Islander",
        ]}
        onChange={(value) => {
          setRace([value]);
          handleUpdate("race", [value]);
        }}
      />

      {/* Skin Tone */}
      {isMatchBuilding ? (
        <MultiSelectCarousel
          label="Skin Tone"
          images={skinToneOptions}
          value={skinTone}
          onChange={(value) => {
            setSkinTone(value);
            handleUpdate("skinTone", value);
          }}
        />
      ) : (
        <SingleSelectCarousel
          label="Skin Tone"
          images={skinToneOptions}
          value={skinTone}
          onChange={(value) => {
            setSkinTone(value);
            handleUpdate("skinTone", value);
          }}
        />
      )}

      {/* Body Type */}
      {isMatchBuilding ? (
        <MultiSelectCarousel
          label="Body Type"
          images={bodyTypeImages}
          value={bodyType}
          onChange={(value) => {
            setBodyType(value);
            handleUpdate("bodyType", value);
          }}
        />
      ) : (
        <SingleSelectCarousel
          label="Body Type"
          images={bodyTypeImages}
          value={bodyType}
          onChange={(value) => {
            setBodyType(value);
            handleUpdate("bodyType", value);
          }}
        />
      )}

      {/* Age */}
      <RangeInput
        label="Age"
        value={age}
        min={18}
        max={110}
        onChange={(value) => {
          setAge(value);
          handleUpdate("age", value);
        }}
        isRange={false}
      />

      {/* Height */}
      <RangeInput
        label="Height"
        value={height}
        min={36}
        max={90}
        onChange={(value) => {
          setHeight(value);
          handleUpdate("height", value);
        }}
        isRange={false}
      />

      {/* Weight */}
      <RangeInput
        label="Weight"
        value={weight}
        min={75}
        max={700}
        onChange={(value) => {
          setWeight(value);
          handleUpdate("weight", value);
        }}
        isRange={false}
      />

      {/* Sexual Orientation */}
      <InputSelect
        label="Sexual Orientation"
        value={sexOrientation}
        options={[
          "STRAIGHT",
          "GAY",
          "LESBIAN",
          "BISEXUAL",
          "PANSEXUAL",
          "ASEXUAL",
          "SAPIOSEXUAL",
        ]}
        onChange={(value) => {
          setSexOrientation(value);
          handleUpdate("sexOrientation", value);
        }}
      />
    </div>
  );
};

const SingleSelectCarousel = ({ label, images, value, onChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesToShow = images.slice(currentIndex, currentIndex + 3);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 < 0 ? 0 : prevIndex - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= images.length ? prevIndex : prevIndex + 3));
  };

  return (
    <div className="text-center">
      <label className="text-lime-400 mb-2">{label}</label>
      <div className="flex items-center justify-between">
        <button onClick={handlePrevious} className="text-white">
          <FaArrowLeft />
        </button>
        <div className="flex space-x-4 overflow-hidden">
          {imagesToShow.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.label}
              className={`w-24 h-24 rounded-lg border-4 cursor-pointer ${
                img.label === value ? "border-lime-400" : "border-gray-600"
              }`}
              onClick={() => onChange(img.label)}
            />
          ))}
        </div>
        <button onClick={handleNext} className="text-white">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
const MultiSelectCarousel = ({ label, images, value, onChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesToShow = images.slice(currentIndex, currentIndex + 3);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 < 0 ? 0 : prevIndex - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= images.length ? prevIndex : prevIndex + 3));
  };

  const toggleSelection = (selectedLabel) => {
    const newValue = value.includes(selectedLabel)
      ? value.filter((item) => item !== selectedLabel)
      : [...value, selectedLabel];
    onChange(newValue);
  };

  return (
    <div className="text-center">
      <label className="text-lime-400 mb-2">{label}</label>
      <div className="flex items-center justify-between">
        <button onClick={handlePrevious} className="text-white">
          <FaArrowLeft />
        </button>
        <div className="flex space-x-4 overflow-hidden">
          {imagesToShow.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.label}
              className={`w-24 h-24 rounded-lg border-4 cursor-pointer ${
                value.includes(img.label) ? "border-lime-400" : "border-gray-600"
              }`}
              onClick={() => toggleSelection(img.label)}
            />
          ))}
        </div>
        <button onClick={handleNext} className="text-white">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};


export default HumanDesign;
