// src/components/FinanceTravel.jsx
import React, { useState, useEffect } from "react";
import { useFilterContext } from "../context/FilterContext";
import { useProfileContext } from "../context/ProfileContext";
import InputMultiSelect from "./InputMultiSelect";
import InputSelect from "./InputSelect";
import RangeSlider from "./RangeSlider";

const FinanceTravel = ({ isMatchBuilding = false }) => {
  const { updateFilter, filters } = useFilterContext();
  const { profileData, updateProfile } = useProfileContext();

  // State for profile creation (single values)
  const [netWorth, setNetWorth] = useState(profileData.financialStability?.netWorth || 0);
  const [annualIncome, setAnnualIncome] = useState(profileData.financialStability?.annualIncome || 0);
  const [creditScore, setCreditScore] = useState(profileData.financialStability?.creditScore || 0);

  // State for match-building (range values)
  const [netWorthRange, setNetWorthRange] = useState([0, 1000000]);
  const [incomeRange, setIncomeRange] = useState([0, 500000]);
  const [creditScoreRange, setCreditScoreRange] = useState([0, 850]);

  // State for transportation and passport
  const [transportation, setTransportation] = useState(profileData.travel?.transportation || []);
  const [passport, setPassport] = useState(profileData.travel?.passport || []);

  // Handler to update contexts
  const handleChange = (section, field, value) => {
    updateFilter(section, { ...filters[section], [field]: value });
    updateProfile(section, { ...profileData[section], [field]: value });
  };

  // Sync state with context
  useEffect(() => {
    if (isMatchBuilding) {
      handleChange("financialStability", "netWorth", netWorthRange);
      handleChange("financialStability", "annualIncome", incomeRange);
      handleChange("financialStability", "creditScore", creditScoreRange);
    } else {
      handleChange("financialStability", "netWorth", netWorth);
      handleChange("financialStability", "annualIncome", annualIncome);
      handleChange("financialStability", "creditScore", creditScore);
    }
    handleChange("travel", "transportation", transportation);
    handleChange("travel", "passport", passport);
  }, [netWorth, annualIncome, creditScore, netWorthRange, incomeRange, creditScoreRange, transportation, passport]);

  return (
    <div className="space-y-4">
      {/* Net Worth */}
      {isMatchBuilding ? (
        <RangeSlider
          label="Net Worth"
          value={netWorthRange}
          min={0}
          max={1000000}
          options={["0", "250k", "500k", "750k", "1M"]}
          onChange={setNetWorthRange}
        />
      ) : (
        <SingleSlider
          label="Net Worth"
          value={netWorth}
          min={0}
          max={1000000}
          onChange={(value) => {
            setNetWorth(value);
            handleChange("financialStability", "netWorth", value);
          }}
        />
      )}

      {/* Annual Income */}
      {isMatchBuilding ? (
        <RangeSlider
          label="Annual Income"
          value={incomeRange}
          min={0}
          max={500000}
          options={["0", "100k", "250k", "400k", "500k"]}
          onChange={setIncomeRange}
        />
      ) : (
        <SingleSlider
          label="Annual Income"
          value={annualIncome}
          min={0}
          max={500000}
          onChange={(value) => {
            setAnnualIncome(value);
            handleChange("financialStability", "annualIncome", value);
          }}
        />
      )}

      {/* Credit Score */}
      {isMatchBuilding ? (
        <RangeSlider
          label="Credit Score"
          value={creditScoreRange}
          min={300}
          max={850}
          options={["300", "400", "500", "600", "700", "800", "850"]}
          onChange={setCreditScoreRange}
        />
      ) : (
        <SingleSlider
          label="Credit Score"
          value={creditScore}
          min={300}
          max={850}
          onChange={(value) => {
            setCreditScore(value);
            handleChange("financialStability", "creditScore", value);
          }}
        />
      )}

      {/* Transportation */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Transportation"
          value={transportation}
          options={[
            "Have No Major Transportation",
            "Have Car(s)",
            "Have Truck(s)",
            "Have Boat(s)",
            "Have Aircraft(s)"
          ]}
          onChange={(value) => {
            setTransportation(value);
            handleChange("travel", "transportation", value);
          }}
        />
      ) : (
        <InputSelect
          label="Transportation"
          value={transportation[0] || ""} // Pass the first item or empty string
          options={[
            "Have No Major Transportation",
            "Have Car(s)",
            "Have Truck(s)",
            "Have Boat(s)",
            "Have Aircraft(s)"
          ]}
          onChange={(value) => {
            const newValue = [value];
            setTransportation(newValue);
            handleChange("travel", "transportation", newValue);
          }}
        />
      )}

      {/* Passport */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Passport"
          value={passport}
          options={[
            "No passport",
            "Applied for Passport",
            "Have Passport",
            "Intend to get Passport"
          ]}
          onChange={(value) => {
            setPassport(value);
            handleChange("travel", "passport", value);
          }}
        />
      ) : (
        <InputSelect
          label="Passport"
          value={passport[0] || ""} // Pass the first item or empty string
          options={[
            "No passport",
            "Applied for Passport",
            "Have Passport",
            "Intend to get Passport"
          ]}
          onChange={(value) => {
            const newValue = [value];
            setPassport(newValue);
            handleChange("travel", "passport", newValue);
          }}
        />
      )}
    </div>
  );
};

// SingleSlider Component
const SingleSlider = ({ label, min, max, value, onChange }) => (
  <div className="flex items-center justify-between bg-gray-800 p-3 md:p-4 rounded-lg">
    <label className="text-lime-400 font-medium text-sm md:text-base">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full bg-gray-700 h-1 rounded-full"
    />
    <span className="text-white ml-4">{value.toLocaleString()} USD</span>
  </div>
);

export default FinanceTravel;
