// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import styles from "./RateTable.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChartLine, faStar, faCheckCircle, faPlusCircle, faFilter, faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import styles2 from "./RatesNavbar.module.css";
// import CurrencyTicker from "./Ticker";
// import axiosInstance from "../modules/admin/utils/axiosinstance";
// import axios from "axios";
// import NavbarButton from "./RatesButton";
// import NormalRatesPage from "../modules/customer/pages/rates_page/Rates/page";
// import Header from "./Header";

// const SpecialRateTable = ({ className }) => {
//   const location = useLocation()
//   const navigate = useNavigate();
//   const [rates, setRates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filteredRates, setFilteredRates] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCountry, setSelectedCountry] = useState("All");
//   const rowsPerPage = 7;
//   const [customerId, setCustomerId] = useState("");
//   const [countryOptions, setCountryOptions] = useState([]);
//   const [selectingRates, setSelectingRates] = useState(false);
//   const [selectedRates, setSelectedRates] = useState({});
//   const [disabledRates, setDisabledRates] = useState(false);

//   // console.log("disbl",disabledRates);
//   console.log("select", rates);


//   useEffect(() => {
//     const fetchRates = async () => {
//       setLoading(true); // Ensure loading state is set
//       try {
//         const response = await axios.get("https://backend.cloudqlobe.com/v3/api/rates");
//         console.log("API Response:", response);

//         // Validate response status
//         if (response.status !== 200) throw new Error("Failed to fetch rates");

//         const rates = response.data; // Use parsed response directly
//         setRates(rates);
//         setFilteredRates(rates);

//         // Extract unique country options
//         const uniqueCountries = Array.from(new Set(rates.map((rate) => rate.country)));
//         setCountryOptions(["All", ...uniqueCountries]);

//         console.log("Rates Data:", rates);
//       } catch (err) {
//         console.error("Error fetching rates:", err);
//         setError("Error fetching rates.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const id = getCustomerIdFromToken();
//     setCustomerId(id);

//     fetchRates();
//   }, []);

//   const getCustomerIdFromToken = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = JSON.parse(atob(token.split(".")[1]));
//         return decoded.customerId || "Guest";
//       } catch (error) {
//         console.error("Invalid token", error);
//       }
//     }
//     return "Not signed in";
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredRates.slice(indexOfFirstRow, indexOfLastRow);
//   const totalPages = Math.ceil(filteredRates.length / rowsPerPage);

//   const handleFilter = () => {
//     const countryFilteredRates =
//       selectedCountry === "All"
//         ? rates
//         : rates.filter((rate) => rate.country === selectedCountry);

//     const selectedRatesFilter = Object.keys(selectedRates)
//       .filter((id) => selectedRates[id])
//       .map((id) => countryFilteredRates.find((rate) => rate._id === id))
//       .filter(Boolean);

//     setFilteredRates(selectedRatesFilter.length ? selectedRatesFilter : countryFilteredRates);
//     setCurrentPage(1);

//   };

//   const toggleRateSelection = (id) => {
//     setSelectedRates((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleSelectRatesClick = () => {
//     setSelectingRates((prev) => !prev);
//     setDisabledRates(true)
//   };

//   const navigateToRatesPage = () => {
//     navigate("/specialrates", { state: selectedRates });
//   };

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleFIlterData = () => {
//     const filtered = currentRows.filter((rate) => selectedRates[rate._id]);
//     console.log("Filtered Data:", filtered);
//     navigate("/specialrates", { state: filtered });
//     // <NormalRatesPage filterData={filtered}/>
//   };
//   console.log(currentRows);


//   return (
//     <>
//         <Header />
//       <Helmet>
//         <title>My Rates Page</title>
//       </Helmet>
//       <header className={styles2.header}>
//         <nav className={styles2.navbar}>
//           <div className={styles2.navbarLeft}>
//             {/* Dynamic CLI/CC Button */}
//             <NavbarButton
//               icon={faChartLine}
//               text={location.pathname === "/cliratestable" ? "CC Rates" : "CLI Rates"}
//               isDisabled={!customerId}
//               onClick={() =>
//                 location.pathname === "/cliratestable"
//                   ? navigate("/pricing")
//                   : navigate("/cliratestable")
//               }
//             />

//             {/* Special Rates Button */}
//             <NavbarButton
//               icon={faStar}
//               text="Special Rates"
//               onClick={navigateToRatesPage}
//             />

//             {/* Select Rates Button */}
//             <NavbarButton
//               icon={faCheckCircle}
//               text="Select Rates"
//               onClick={handleSelectRatesClick}
//             />

//             {/* Filter Rates Button */}
//             <NavbarButton
//               icon={faFilter}
//               text="Filter Rates"
//               isDisabled={!disabledRates}
//               onClick={handleFIlterData}
//             />

//             {/* Add Rates Button */}
//             <NavbarButton
//               icon={faPlusCircle}
//               text="Add Rates"
//               isDisabled={!disabledRates}
//               onClick={() => navigate("/addrates")}
//             />
//           </div>
//         </nav>
//       </header>

//       <div className={styles.container}>
//         {error && (
//           <div className={styles.errorNotification}>
//             <p>{error}</p>
//           </div>
//         )}

//         <CurrencyTicker />
//         <div className={styles.container} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div className="flex items-center" style={{ marginLeft: "3.5em" }}>
//             <div className="bg-orange-500 text-2xl rounded-lg text-white p-2 mr-2" style={{ paddingTop: ".25em", paddingLeft: ".8em", paddingRight: ".8em", paddingBottom: ".25em" }}>
//               $
//             </div>
//             <div className="flex items-center p-2 py-2 rounded-lg bg-blue-500">
//               <h1 className="text-lg font-regular text-white mb-0">Premium CC Routes</h1>
//             </div>
//           </div>

//           <div className={styles.searchArea} style={{ display: "flex", alignItems: "center", marginRight: "3em" }}>
//             <select
//               className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={selectedCountry}
//               onChange={(e) => setSelectedCountry(e.target.value)}
//               style={{ marginRight: "8px" }}
//             >
//               {countryOptions.map((country) => (
//                 <option key={country} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>

//             <button
//               onClick={handleFilter}
//               className="px-8 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-blue-600"
//             >
//               Filter
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className={`${styles.tableContainer} ${className}`} style={{ marginTop: "0" }}>
//         {loading ? (
//           <div className={styles.loading}>Loading...</div>
//         ) : (
//           <table className={styles.rateTable}>
//             <thead>
//               <tr>
//                 {selectingRates && <th>Select</th>}
//                 <th>Country Code</th>
//                 <th>Country Name</th>
//                 <th className="special-header">Quality Description</th>
//                 <th>Profile</th>
//                 <th>Rate</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.length === 0 ? (
//                 <tr>
//                   <td colSpan={selectingRates ? 7 : 6} className={styles.noResults}>
//                     No results found.
//                   </td>
//                 </tr>
//               ) : (
//                 currentRows.map((rate) => (
//                   <tr key={rate._id}>
//                     {selectingRates && (
//                       <td>
//                         <input
//                           type="checkbox"
//                           checked={!!selectedRates[rate._id]}
//                           onChange={() => toggleRateSelection(rate._id)}
//                         />
//                       </td>
//                     )}
//                     <td>{rate.countryCode}</td>
//                     <td>{rate.country}</td>
//                     <td>{rate.qualityDescription}</td>
//                     <td>{rate.profile}</td>
//                     <td>{rate.rate}</td>
//                     <td className={`${rate.status.toLowerCase() === "active" ? "text-green-600" : "text-red-600"}`}>
//                       {rate.status?.charAt(0).toUpperCase() + rate.status.slice(1)}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}

//         <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", paddingBottom: "1rem" }}>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ""}`}
//               onClick={() => paginate(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SpecialRateTable;