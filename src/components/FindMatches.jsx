import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilterContext } from "../context/FilterContext";
import BasicDetails from "../components/BasicDetailsForm";
import FinanceTravel from "../components/FinanceAndTravelForm";
import HumanDesign from "../components/HumanDesignForm";
import EntertainmentHousehold from "../components/EntertainmentHousehold";
import RelationshipHealth from "../components/RelationshipHealthForm";
import api from "../utils/axiosInstance";

function FindMatch() {
  const { filters, updateFilter } = useFilterContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const steps = [
    "Basic Details",
    "Finance & Travel",
    "Human Design",
    "Entertainment & Household",
    "Relationship & Health",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSearch = async () => {
    console.log("Collected Filters:", JSON.stringify(filters, null, 2));

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/matches/search", { filters });

      if (response.data.success) {
        navigate("/results", { state: { profiles: response.data.matches } });
      } else {
        setError("No matches found.");
      }
    } catch (err) {
      setError("Failed to find matches. Please try again.");
      console.error("Match Search Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white px-4 py-6">
      <div className="relative max-w-md mx-auto bg-gray-900 rounded-xl p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">{steps[currentStep]}</h1>
        </div>

        <div className="space-y-4">
          {currentStep === 0 && (
            <BasicDetails
              isMatchBuilding={true}
              data={filters.basicDetails}
              onChange={(data) => updateFilter("basicDetails", data)}
            />
          )}
          {currentStep === 1 && (
            <FinanceTravel
              isMatchBuilding={true}
              data={filters.financeTravel}
              onChange={(data) => updateFilter("financeTravel", data)}
            />
          )}
          {currentStep === 2 && (
            <HumanDesign
              isMatchBuilding={true}
              data={filters.humanDesign}
              onChange={(data) => updateFilter("humanDesign", data)}
            />
          )}
          {currentStep === 3 && (
            <EntertainmentHousehold
              isMatchBuilding={true}
              data={filters.entertainment}
              onChange={(data) => updateFilter("entertainment", data)}
            />
          )}
          {currentStep === 4 && (
            <RelationshipHealth
              isMatchBuilding={true}
              data={filters.relationshipAndHealth}
              onChange={(data) =>
                updateFilter("relationshipAndHealth", data)
              }
            />
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="bg-gray-600 text-white py-2 px-4 rounded"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-lime-400 text-black py-2 px-4 rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSearch}
              className="bg-lime-400 text-black py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Searching..." : "Find Matches"}
            </button>
          )}
        </div>

        {loading && <p className="text-lime-400 mt-4">Searching...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default FindMatch;
