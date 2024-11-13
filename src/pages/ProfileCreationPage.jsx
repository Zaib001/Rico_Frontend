import React, { useState } from "react";
import { useProfileContext } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axiosInstance";
import BasicDetails from "../components/BasicDetailsForm";
import Pictures from "../components/Pictures";
import FinanceTravel from "../components/FinanceAndTravelForm";
import EntertainmentHousehold from "../components/EntertainmentHousehold";
import HumanDesign from "../components/HumanDesignForm";
import RelationshipHealth from "../components/RelationshipHealthForm";

function ProfileCreation() {
  const [activeTab, setActiveTab] = useState("Pictures");
  const { profileData, updateProfileData } = useProfileContext();
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const tabs = [
    "Pictures",
    "Basic Details",
    "Finance & Travel",
    "Entertainment & Household",
    "Human Design",
    "Relationship & Health",
  ];

  // Get the index of the current active tab
  const currentIndex = tabs.indexOf(activeTab);

  const handleNext = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleFindMatch = async () => {
    setError(null);

    if (!user?._id) {
      setError("User ID not found. Please log in again.");
      return;
    }

    try {
      const filters = {
        profilePicture: profileData.pictures.image || {},
        audioBio: profileData.pictures.audio || {},
        basicDetails: profileData.basicDetails || {},
        financialStability: profileData.financialStability || {},
        financeTravel: profileData.travel || {},
        entertainment: profileData.entertainment || {},
        household: profileData.household || {},
        humanDesign: profileData.humanDesign || {},
        relationshipAndHealth: profileData.relationshipAndHealth || {},
      };

      const data = {
        filters,
        bio: profileData.bio || "",
        audioBio: profileData.audioBio || "",
      };
      console.log(profileData);

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      const response = await api.post("/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status !== 201) {
        throw new Error(`Unexpected status code: ${response.status}`);
      }

      console.log("Profile created:", response.data);
      alert("Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile:", error);
      setError(
        error.response?.data?.error || "Failed to create profile. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white px-4 py-6 sm:p-8 md:px-12 lg:p-16">
      <div className="relative max-w-md mx-auto bg-gray-900 rounded-xl p-6 md:p-8">
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Create Profile, {user?.name || "Guest"}
          </h1>
        </div>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">{tabs[currentIndex]}</h1>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          {activeTab === "Pictures" && <Pictures />}
          {activeTab === "Basic Details" && (
            <BasicDetails
              isMatchBuilding={false}
              data={profileData.basicDetails}
              onChange={(data) => updateProfileData("basicDetails", data)}
            />
          )}
          {activeTab === "Finance & Travel" && (
            <FinanceTravel
              data={profileData.financeTravel}
              onChange={(data) => updateProfileData("financeTravel", data)}
            />
          )}
          {activeTab === "Entertainment & Household" && (
            <EntertainmentHousehold
              data={profileData.entertainment}
              onChange={(data) => updateProfileData("entertainment", data)}
            />
          )}
          {activeTab === "Human Design" && (
            <HumanDesign
              data={profileData.humanDesign}
              onChange={(data) => updateProfileData("humanDesign", data)}
            />
          )}
          {activeTab === "Relationship & Health" && (
            <RelationshipHealth
              data={profileData.relationshipAndHealth}
              onChange={(data) =>
                updateProfileData("relationshipAndHealth", data)
              }
            />
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          {activeTab === "Relationship & Health" ? (
            <button
              onClick={handleFindMatch}
              className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-2 px-4 rounded"
            >
              Create Profile
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCreation;
 