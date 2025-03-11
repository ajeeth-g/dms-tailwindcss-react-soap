import React, { useState } from "react";

const DashboardFilter = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("30");

  const filterOptions = [
    { label: "Past 7 Days", value: "7" },
    { label: "Past 30 Days", value: "30" },
    { label: "Past 90 Days", value: "90" },
  ];

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedFilter(newValue);
    onFilterChange(newValue);
  };

  return (
    <>
      <div className="join">
        {filterOptions.map((option) => (
          <input
            key={option.value}
            type="radio"
            name="dateFilter"
            value={option.value}
            aria-label={option.label}
            checked={selectedFilter === option.value}
            onChange={handleChange}
            className="join-item btn btn-sm"
          />
        ))}
      </div>
    </>
  );
};

export default DashboardFilter;
