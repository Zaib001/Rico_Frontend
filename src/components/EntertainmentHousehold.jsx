// src/components/EntertainmentHousehold.jsx
import React, { useState, useEffect } from "react";
import { useFilterContext } from "../context/FilterContext";
import { useProfileContext } from "../context/ProfileContext";
import InputMultiSelect from "./InputMultiSelect";
import InputSelect from "./InputSelect";
import RangeInput from "./RangeInput";
import SingleValueInput from "./SingleValueInput"; // New component for single value input

const EntertainmentHousehold = ({ isMatchBuilding = false }) => {
  const { updateFilter, filters } = useFilterContext();
  const { profileData, updateProfile } = useProfileContext();

  // State management
  const [musicGenres, setMusicGenres] = useState(
    profileData.entertainment?.musicGenres || []
  );
  const [movieGenres, setMovieGenres] = useState(
    profileData.entertainment?.movieGenres || []
  );
  const [residingStatus, setResidingStatus] = useState(
    profileData.household?.residingStatus || []
  );
  const [adultsInHouse, setAdultsInHouse] = useState(
    profileData.household?.adultsInHouse || []
  );
  const [numAdults, setNumAdults] = useState(
    profileData.household?.numAdults || 1
  );
  const [children, setChildren] = useState(
    profileData.household?.children || []
  );
  const [numChildren, setNumChildren] = useState(
    profileData.household?.numChildren || 0
  );
  const [indoorPets, setIndoorPets] = useState(
    profileData.household?.indoorPets || []
  );

  // Handlers for updating state and context
  const handleUpdate = (section, field, value) => {
    console.log(`Updating ${section} - ${field}:`, value); // Debug log to verify updates
    updateFilter(section, { ...filters[section], [field]: value });
    updateProfile(section, { ...profileData[section], [field]: value });
  };

  // Effects to update context whenever state changes
  useEffect(() => {
    handleUpdate("entertainment", "musicGenres", musicGenres);
    handleUpdate("entertainment", "movieGenres", movieGenres);
    handleUpdate("household", "residingStatus", residingStatus);
    handleUpdate("household", "adultsInHouse", adultsInHouse);
    handleUpdate("household", "numAdults", numAdults);
    handleUpdate("household", "children", children);
    handleUpdate("household", "numChildren", numChildren);
    handleUpdate("household", "indoorPets", indoorPets);
  }, [musicGenres, movieGenres, residingStatus, adultsInHouse, numAdults, children, numChildren, indoorPets]);

  return (
    <div className="space-y-4">
      {/* Music Genres */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Favorite Movie Genre"
          value={movieGenres}
          options={[
            "Action", "Adventure", "Animation", "Biographical", "Comedy", "Crime",
            "Documentary", "Drama", "Family", "Fantasy", "Historical", "Horror",
            "Martial Arts", "Musical", "Mystery", "Romance", "Science Fiction",
            "Sports", "Spy/Espionage", "Superhero", "Supernatural/Paranormal",
            "Thriller", "War", "Western"
          ]}
          limit={6}
          onChange={setMovieGenres}
        />
      ) : (
        <InputSelect
          label="Favorite Movie Genre"
          value={movieGenres[0] || ""}
          options={[
            "Action", "Adventure", "Animation", "Biographical", "Comedy", "Crime",
            "Documentary", "Drama", "Family", "Fantasy", "Historical", "Horror",
            "Martial Arts", "Musical", "Mystery", "Romance", "Science Fiction",
            "Sports", "Spy/Espionage", "Superhero", "Supernatural/Paranormal",
            "Thriller", "War", "Western"
          ]}
          onChange={(value) => setMovieGenres([value])}
        />
      )}

      {/* Movie Genres */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Favorite Music Genre"
          value={musicGenres}
          options={[
            "Blues", "Classical", "Country", "EDM", "Electronic/Dance", "Folk",
            "Funk", "Gospel", "Hip-hop/Rap", "House", "Jazz", "Latin", "Metal",
            "Pop", "Punk", "R&B", "Reggae", "Rock", "Soul", "Techno"
          ]}
          limit={6}
          onChange={(value) => {
            setMusicGenres(value);
            handleUpdate("entertainment", "musicGenres", value);
          }}
        />
      ) : (
        <InputSelect
          label="Favorite Music Genre"
          value={musicGenres[0] || ""}
          options={[
            "Blues", "Classical", "Country", "EDM", "Electronic/Dance", "Folk",
            "Funk", "Gospel", "Hip-hop/Rap", "House", "Jazz", "Latin", "Metal",
            "Pop", "Punk", "R&B", "Reggae", "Rock", "Soul", "Techno"
          ]}
          onChange={(value) => {
            const newValue = [value];
            setMusicGenres(newValue);
            handleUpdate("entertainment", "musicGenres", newValue);
          }}
        />
      )}

      {/* Residing Status */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Residing Status"
          value={residingStatus}
          options={["Buying", "Renting", "Owned", "Contributing", "Temp stay"]}
          limit={5}
          onChange={(value) => {
            setResidingStatus(value);
            handleUpdate("household", "residingStatus", value);
          }}
        />
      ) : (
        <InputSelect
          label="Residing Status"
          value={residingStatus[0] || ""}
          options={["Buying", "Renting", "Owned", "Contributing", "Temp stay"]}
          onChange={(value) => {
            const newValue = [value];
            setResidingStatus(newValue);
            handleUpdate("household", "residingStatus", newValue);
          }}
        />

      )}

      {/* Adults in House */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Adults in House"
          value={adultsInHouse}
          options={["Live alone", "Live with adult(s)", "Roommate", "Taking care of Parent(s)"]}
          limit={4}
          onChange={setAdultsInHouse}
        />
      ) : (
        <InputSelect
          label="Adults in House"
          value={adultsInHouse[0] || ""}
          options={["Live alone", "Live with adult(s)", "Roommate", "Taking care of Parent(s)"]}
          onChange={(value) => setAdultsInHouse([value])}
        />
      )}

      {/* Number of Adults */}
      {isMatchBuilding ? (
        <RangeInput
          label="Number of Adults (Range)"
          min={1}
          max={10}
          value={numAdults}
          onChange={setNumAdults}
        />
      ) : (
        <SingleValueInput
          label="Number of Adults"
          min={1}
          max={10}
          value={numAdults}
          onChange={(newValue) => {
            if (!isNaN(newValue)) {
              setNumAdults(newValue);
              handleUpdate("household", "numAdults", newValue);
            }
          }}
        />



      )}

      {/* Children */}
      {/* {isMatchBuilding ? (
        <InputMultiSelect
          label="Children"
          value={children}
          options={["No children", "Have infant(s)", "Have pre-teen(s)", "Have teenager(s)", "Have grown children"]}
          limit={4}
          onChange={(value) => {
            setChildren(value);
            if (value.includes("No children")) {
              setChildren(["No children"]);
            }
          }}
          disableOptions={children.includes("No children") ? ["Have infant(s)", "Have pre-teen(s)", "Have teenager(s)", "Have grown children"] : []}
        />
      ) : (
        <InputSelect
          label="Children"
          value={children[0] || ""}
          options={["No children", "Have infant(s)", "Have pre-teen(s)", "Have teenager(s)", "Have grown children"]}
          onChange={(value) => setChildren([value])}
        />
      )} */}

      {/* Number of Children */}
      {isMatchBuilding ? (
        <RangeInput
          label="Number of Children (Range)"
          min={0}
          max={10}
          value={numChildren}
          onChange={setNumChildren}
        />
      ) : (
        <SingleValueInput
          label="Number of Children"
          min={0}
          max={10}
          value={numChildren}
          onChange={(newValue) => {
            if (!isNaN(newValue)) {
              setNumChildren(newValue);
              handleUpdate("household", "numChildren", newValue);
            }
          }}
        />
      )}

      {/* Indoor Pets */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Indoor Pets"
          value={indoorPets}
          options={["None", "Have dog(s)", "Have cat(s)", "Have bird(s)", "Have reptile(s)", "Have rodent(s)"]}
          limit={6}
          onChange={(value) => {
            setIndoorPets(value);
            if (value.includes("None")) {
              setIndoorPets(["None"]);
            }
          }}
          disableOptions={indoorPets.includes("None") ? ["Have dog(s)", "Have cat(s)", "Have bird(s)", "Have reptile(s)", "Have rodent(s)"] : []}
        />
      ) : (
        <InputSelect
          label="Indoor Pets"
          value={indoorPets[0] || ""}
          options={["None", "Have dog(s)", "Have cat(s)", "Have bird(s)", "Have reptile(s)", "Have rodent(s)"]}
          onChange={(value) => setIndoorPets([value])}
        />
      )}
    </div>
  );
};

export default EntertainmentHousehold;
