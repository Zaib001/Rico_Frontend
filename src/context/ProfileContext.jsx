import React, { createContext, useContext, useState } from "react";

// Create the Profile Context
const ProfileContext = createContext();

// Custom hook to use the Profile Context
export const useProfileContext = () => useContext(ProfileContext);

// Provider component for the Profile Context
export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    basicDetails: {},
    financialStability: {},
    travel: {},
    bio: "", // Ensure bio is a string by default
    humanDesign: {},
    entertainment: {},
    household: {},
    relationshipAndHealth: {},
    pictures: {
      profilePicture: null, // For profile picture storage
      galleryPics: [], // For storing gallery picture URLs
      audioBio: null, // For storing audio bio URL
    },
  });

  // Function to update profile data
  const updateProfile = (field, value) => {
    if (field === "pictures") {
      const isValidAudioBio = typeof value.audioBio === "string" || value.audioBio === null;
      const isValidProfilePicture = typeof value.profilePicture === "string" || value.profilePicture === null;
  
      if (typeof value.galleryPics !== "undefined" && !Array.isArray(value.galleryPics)) {
        console.error(`Invalid value for galleryPics. Expected an array, received:`, value.galleryPics);
        return;
      }
  
      if (!isValidAudioBio && typeof value.audioBio !== "undefined") {
        console.error(`Invalid value for audioBio. Received:`, value.audioBio);
        return;
      }
  
      if (!isValidProfilePicture && typeof value.profilePicture !== "undefined") {
        console.error(`Invalid value for profilePicture. Received:`, value.profilePicture);
        return;
      }
  
      setProfileData((prev) => ({
        ...prev,
        pictures: {
          ...prev.pictures,
          ...value,
        },
      }));
    } else {
      // General update logic for other fields
      setProfileData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          ...value,
        },
      }));
    }
  };
  

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Exported hook for using filter context (if needed)
export const useFilterContext = () => useContext(ProfileContext);
