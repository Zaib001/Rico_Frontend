// src/pages/MatchResultsPage.jsx
import React, { useState, useEffect } from "react";
import MatchResultCard from "../components/MatchResultCard";
import { useLocation } from "react-router-dom";

const MatchResultsPage = () => {
  const location = useLocation();
  const { profiles } = location.state || { profiles: [] };
  console.log(profiles);

  const [dismissedProfiles, setDismissedProfiles] = useState(() => {
    const storedDismissed = localStorage.getItem("dismissedProfiles");
    return storedDismissed ? JSON.parse(storedDismissed) : [];
  });

  // Filter out dismissed profiles and sort by match percentage for ranking
  const sortedProfiles = profiles
    .filter((profile) => !dismissedProfiles.includes(profile.user._id))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const [matches, setMatches] = useState(
    sortedProfiles.map((profile, index) => ({
      ...profile,
      rank: index + 1,
      totalMatches: sortedProfiles.length,
    }))
  );

  useEffect(() => {
    // Save dismissed profile IDs to local storage whenever it updates
    localStorage.setItem("dismissedProfiles", JSON.stringify(dismissedProfiles));
  }, [dismissedProfiles]);

  const handleDismiss = (profileId) => {
    console.log("Before Dismiss:", matches);

    // Add the dismissed profile ID to the state
    setDismissedProfiles((prev) => [...new Set([...prev, profileId])]);

    // Filter out the dismissed profile from the matches state
    const updatedMatches = matches.filter((match) => match.user._id !== profileId);
    console.log("After Dismiss:", updatedMatches);
    setMatches(updatedMatches);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Match Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.length > 0 ? (
          matches.map((profile, index) => (
            <MatchResultCard
              key={index}
              profile={profile}
              onDismiss={handleDismiss}
              
            />
          ))
        ) : (
          <p className="text-center text-gray-400">No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default MatchResultsPage;
