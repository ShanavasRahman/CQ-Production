import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import styles from "./RateTable.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Ticker from "./Ticker";
import RateTable from "./CCRates"; // Import the reusable RateTable component

const VoIPRatesTable = () => {
  // State Variables
  const [rates, setRates] = useState([]); // Current rates to display
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [usingPresetData, setUsingPresetData] = useState(false); // Flag for preset data

  const pageSize = 5; // Number of items per page

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setCurrentPage(1); // Reset to first page on new search
        setSearchQuery(query);
      }, 500), // 500ms debounce delay
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleSearchClick = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleJoinClick = () => {
    console.log("Join Now clicked");
  };

  const closeErrorNotification = () => {
    setError(null);
  };

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);




  return (
    <div className={styles.container}>
      <RateTable loading={loading} error={error}  />
    </div>
  );
};

export default VoIPRatesTable;
