// src/components/RelationshipHealth.jsx
import React, { useState, useEffect } from "react";
import { useFilterContext } from "../context/FilterContext";
import { useProfileContext } from "../context/ProfileContext";
import InputMultiSelect from "./InputMultiSelect";
import InputSelect from "./InputSelect";

const RelationshipHealth = ({ isMatchBuilding = false }) => {
  const { updateFilter, filters } = useFilterContext();
  const { profileData, updateProfile } = useProfileContext();

  // Extract initial values
  const [relationshipStatus, setRelationshipStatus] = useState(
    profileData.relationshipAndHealth?.relationshipStatus || (isMatchBuilding ? [] : "")
  );
  const [relationshipGoals, setRelationshipGoals] = useState(
    profileData.relationshipAndHealth?.relationshipGoals || (isMatchBuilding ? [] : "")
  );
  const [alcoholUse, setAlcoholUse] = useState(
    profileData.relationshipAndHealth?.alcoholUse || (isMatchBuilding ? [] : "")
  );
  const [cannabisUse, setCannabisUse] = useState(
    profileData.relationshipAndHealth?.cannabisUse || (isMatchBuilding ? [] : "")
  );
  const [otherDrugUse, setOtherDrugUse] = useState(
    profileData.relationshipAndHealth?.otherDrugUse || (isMatchBuilding ? [] : "")
  );

  // Unified state updater
  const handleChange = (field, value) => {
    updateFilter("relationshipAndHealth", { ...filters.relationshipAndHealth, [field]: value });
    updateProfile("relationshipAndHealth", { ...profileData.relationshipAndHealth, [field]: value });
  };

  useEffect(() => {
    handleChange("relationshipStatus", relationshipStatus);
    handleChange("relationshipGoals", relationshipGoals);
    handleChange("alcoholUse", alcoholUse);
    handleChange("cannabisUse", cannabisUse);
    handleChange("otherDrugUse", otherDrugUse);
  }, [relationshipStatus, relationshipGoals, alcoholUse, cannabisUse, otherDrugUse]);

  return (
    <div className="space-y-4">
      {/* Relationship Status */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Current Relationship Status"
          value={relationshipStatus}
          options={[
            "Single",
            "Poly",
            "Cheating",
            "Married",
            "Divorced",
            "Widowed",
            "Separated"
          ]}
          limit={7}
          onChange={(value) => {
            setRelationshipStatus(value);
            handleChange("relationshipStatus", value);
          }}
        />
      ) : (
        <InputSelect
          label="Current Relationship Status"
          value={relationshipStatus}
          options={[
            "Single",
            "Poly",
            "Cheating",
            "Married",
            "Divorced",
            "Widowed",
            "Separated"
          ]}
          onChange={(value) => {
            setRelationshipStatus(value);
            handleChange("relationshipStatus", value);
          }}
        />
      )}

      {/* Relationship Goals */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Relationship Goals"
          value={relationshipGoals}
          options={[
            "Casual Dating",
            "Polyamory",
            "Marriage",
            "Friendship",
            "Monogamous Relationship",
            "Friends with Benefits (FWB)",
            "Long-term Relationship",
            "Experimental Relationship",
            "Hook-ups",
            "Networking Opportunities",
            "Open Relationship"
          ]}
          limit={7}
          onChange={(value) => {
            setRelationshipGoals(value);
            handleChange("relationshipGoals", value);
          }}
        />
      ) : (
        <InputSelect
          label="Relationship Goals"
          value={relationshipGoals}
          options={[
            "Casual Dating",
            "Polyamory",
            "Marriage",
            "Friendship",
            "Monogamous Relationship",
            "Friends with Benefits (FWB)",
            "Long-term Relationship",
            "Experimental Relationship",
            "Hook-ups",
            "Networking Opportunities",
            "Open Relationship"
          ]}
          onChange={(value) => {
            setRelationshipGoals(value);
            handleChange("relationshipGoals", value);
          }}
        />
      )}

      {/* Alcohol Use */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Alcohol Use"
          value={alcoholUse}
          options={[
            "No Alcohol use",
            "Alcohol occasionally",
            "Alcohol rarely",
            "Alcohol at least 3 times weekly"
          ]}
          limit={4}
          onChange={(value) => {
            setAlcoholUse(value);
            handleChange("alcoholUse", value);
            if (value.includes("No Alcohol use")) {
              setAlcoholUse(["No Alcohol use"]);
              handleChange("alcoholUse", ["No Alcohol use"]);
            }
          }}
          disableOptions={alcoholUse.includes("No Alcohol use") ? ["Alcohol occasionally", "Alcohol rarely", "Alcohol at least 3 times weekly"] : []}
        />
      ) : (
        <InputSelect
          label="Alcohol Use"
          value={alcoholUse}
          options={[
            "No Alcohol use",
            "Alcohol occasionally",
            "Alcohol rarely",
            "Alcohol at least 3 times weekly"
          ]}
          onChange={(value) => {
            setAlcoholUse(value);
            handleChange("alcoholUse", value);
          }}
        />
      )}

      {/* Cannabis Use */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Cannabis Use"
          value={cannabisUse}
          options={[
            "No CBD use",
            "CBD products occasionally",
            "CBD rarely",
            "CBD at least 3 times weekly",
            "CBD medically"
          ]}
          limit={5}
          onChange={(value) => {
            setCannabisUse(value);
            handleChange("cannabisUse", value);
            if (value.includes("No CBD use")) {
              setCannabisUse(["No CBD use"]);
              handleChange("cannabisUse", ["No CBD use"]);
            }
          }}
          disableOptions={cannabisUse.includes("No CBD use") ? ["CBD products occasionally", "CBD rarely", "CBD at least 3 times weekly", "CBD medically"] : []}
        />
      ) : (
        <InputSelect
          label="Cannabis Use"
          value={cannabisUse}
          options={[
            "No CBD use",
            "CBD products occasionally",
            "CBD rarely",
            "CBD at least 3 times weekly",
            "CBD medically"
          ]}
          onChange={(value) => {
            setCannabisUse(value);
            handleChange("cannabisUse", value);
          }}
        />
      )}

      {/* Other Drug Use */}
      {isMatchBuilding ? (
        <InputMultiSelect
          label="Other Drug Use"
          value={otherDrugUse}
          options={[
            "No Other Drug use",
            "Other Drug use occasionally",
            "Other Drug use rarely",
            "Other Drug use at least 3 times weekly"
          ]}
          limit={4}
          onChange={(value) => {
            setOtherDrugUse(value);
            handleChange("otherDrugUse", value);
            if (value.includes("No Other Drug use")) {
              setOtherDrugUse(["No Other Drug use"]);
              handleChange("otherDrugUse", ["No Other Drug use"]);
            }
          }}
          disableOptions={otherDrugUse.includes("No Other Drug use") ? ["Other Drug use occasionally", "Other Drug use rarely", "Other Drug use at least 3 times weekly"] : []}
        />
      ) : (
        <InputSelect
          label="Other Drug Use"
          value={otherDrugUse}
          options={[
            "No Other Drug use",
            "Other Drug use occasionally",
            "Other Drug use rarely",
            "Other Drug use at least 3 times weekly"
          ]}
          onChange={(value) => {
            setOtherDrugUse(value);
            handleChange("otherDrugUse", value);
          }}
        />
      )}
    </div>
  );
};

export default RelationshipHealth;
