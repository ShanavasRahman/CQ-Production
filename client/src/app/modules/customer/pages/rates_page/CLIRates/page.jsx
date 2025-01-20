import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles2 from "../../../../../components/RatesNavbar.module.css";
import { faChartLine, faStar, faCheckCircle, faPlusCircle, faFilter, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import { useLocation } from "react-router-dom";
import NavbarButton from "../../../../../components/RatesButton";

const CLIRatesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [sort, setSort] = useState("countryCode");
  const [normalRatesData, setNormalRatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRates, setSelectedRates] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [showSelectColumn, setShowSelectColumn] = useState(false);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const [filterMyRate, setFilterMyRate] = useState()
  const [disabledRate, setDisabledRate] = useState(false)
  const { filtered, isDisabled } = location.state || {}; // Destructure state properties

  // console.log("disabled",disabledRate);

  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null
    const decoded = jwtDecode(token);
    return decoded.id;
  };

  useEffect(() => {
    const fetchCustomerAndRates = async () => {
      setLoading(true);
      try {
        const customerId = getCustomerIdFromToken();
        if (customerId) {
          const customerResponse = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${customerId}`);
          setCustomerData(customerResponse.data);
        }
      } catch (error) {
        console.error("Error fetching customer or rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAndRates();

    if (filtered) {
      setFilterMyRate(filtered);
      setDisabledRate(isDisabled)
    }
  }, []);

  const filteredData =
    Array.isArray(filterMyRate) && filterMyRate.length > 0
      ? filterMyRate
      : normalRatesData.filter((item) =>
        item.country.toLowerCase().includes(search.toLowerCase())
      );

  const sortedData = filteredData.sort((a, b) => {
    return sort === "countryName"
      ? a.country.localeCompare(b.country)
      : a.countryCode.localeCompare(b.countryCode);
  });

  const displayedData = showOnlySelected ? selectedRates : sortedData;

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-orange-300 border-solid rounded-full"
        />
      </div>
    );
  }

  // Check if a rate is disabled based on customer's data
  const isRateDisabled = (rateId) => {
    if (!customerData) return false;
    const { myRatesId, rateAddedtotest, rateTested, rateTesting } = customerData;

    return (
      myRatesId.includes(rateId) ||
      rateAddedtotest.includes(rateId) ||
      rateTested.includes(rateId) ||
      rateTesting.includes(rateId)
    );
  };

  const navigateToRatesPage = () => {
    navigate("/pricing");
  };


  const handleMyRates = async () => {
    if (!Array.isArray(filterMyRate) || filterMyRate.length === 0) {
      console.error("No rates to add.");
      alert('No rates to add')

      return;
    }

    const customerId = getCustomerIdFromToken();
    if (!customerId) {
      console.error("Customer ID is missing.");
      navigate('/signIn')
      return;
    }
    // https://backend.cloudqlobe.com
    try {
      for (const rate of filterMyRate) {
        await axios.post("https://backend.cloudqlobe.com/v3/api/myrates", {
          customerId,
          rate:"CLI",
          rateId: rate._id,
          testStatus: rate.testStatus,
          addedTime: rate.addedTime,
        });
      }
      navigate('/cliratestable')
      alert("All rates added successfully.");
      filterMyRate = ''
    } catch (error) {
      console.error("Error adding rates:", error);
    }
  };

  const filterSpecialRate = () => {
    setFilterMyRate(selectedRates)

    setShowSelectColumn(!showSelectColumn)
  }

  const handleDisabled = () => {
    setDisabledRate(!disabledRate)
    setShowSelectColumn(!showSelectColumn)
  }

  console.log(selectedRates);
  console.log(filtered);


  return (
    <>
      <Header />
      <header className={styles2.header}>
        <nav className={styles2.navbar}>
          <div className={styles2.navbarLeft}>

            <div className={styles2.navbarItem} onClick={navigateToRatesPage}>
              <div className={styles2.navbarItemIcon} >
                <FontAwesomeIcon icon={faChartLine} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText}`}>CC Rates</div>
            </div>

            <div className={styles2.navbarItem}>
              <div className={styles2.navbarItemIcon} >
                <FontAwesomeIcon icon={faStar} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText}`}>Special Rates</div>
            </div>

            <div className={styles2.navbarItem} onClick={handleDisabled}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faCheckCircle} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText}`}>Select Rates</div>
            </div>

            {/* Filter Rates Button */}
            <NavbarButton
              icon={faFilter}
              text="Filter Rates"
              isDisabled={!disabledRate}
              onClick={filterSpecialRate}
            />

            {/* Add Rates Button */}
            <NavbarButton
              icon={faPlusCircle}
              text="Add Rates"
              isDisabled={!disabledRate}
              onClick={handleMyRates}
            />

          </div>
          <div className={styles2.navbarProfile}>
            {customerId} &ensp;<FontAwesomeIcon icon={faUserCircle} size="lg" />
          </div>
        </nav>
      </header>
      <div className="p-6 bg-gray-100 text-gray-800">
        <div className="tableContainer overflow-x-auto py-5 rounded-lg">
          <table className="rateTable w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-[#005F73] text-white uppercase tracking-wider rounded-lg">
                {showSelectColumn && (
                  <th className="p-2 text-center border border-gray-300">Select</th>
                )}
               {/* <th>Country Code</th> */}
                <th>Country</th>
                <th>Quality Description</th>
                <th>RTP</th>
                <th>ASR</th>
                <th>ACD</th>
                <th>Rate ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${index % 2 === 0 ? "bg-[#dde0e5]" : "bg-[#FFFFFF]"
                    } hover:bg-[#b5b8bc] transition duration-200 ease-in-out`}
                >
                  {showSelectColumn && (
                    <td className="p-2 text-center border border-gray-300">
                      <input
                        type="checkbox"
                        disabled={isRateDisabled(item._id)}
                        checked={selectedRates.some((rate) => rate._id === item._id)}
                        onChange={() => {
                          if (selectedRates.some((rate) => rate._id === item._id)) {
                            setSelectedRates(
                              selectedRates.filter((rate) => rate._id !== item._id)
                            );
                          } else {
                            setSelectedRates([...selectedRates, item]);
                          }
                        }}
                      />
                    </td>
                  )}
                {/* <td className="p-2 text-center border border-gray-300">{item.countryCode}</td> */}
                  <td className="p-2 text-center border border-gray-300">{item.country}</td>
                  <td className="p-2 text-center border border-gray-300">{item.qualityDescription}</td>
                  <td className="p-2 text-center border border-gray-300">{item.rtp}</td>
                  <td className="p-2 text-center border border-gray-300">{item.asr}</td>
                  <td className="p-2 text-center border border-gray-300">{item.acd}</td>
                  <td className="p-2 text-center border border-gray-300">{item.rate}</td>
                  <td className="p-2 text-center border border-gray-300">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default CLIRatesPage;