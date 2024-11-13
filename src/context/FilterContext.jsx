// src/context/FilterContext.jsx
import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();
export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    basicDetails: {},
    financialStability: {},
    travel: {},
    humanDesign: {},
    entertainment: {},
    household: {},
    relationshipAndHealth: {},
  });

  const updateFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
