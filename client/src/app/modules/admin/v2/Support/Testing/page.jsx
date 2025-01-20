import React, { useEffect, useState } from "react";
import axios from "axios";
import { SiVitest, SiBitcomet } from "react-icons/si";
import DashboardLayout from "../../layout/page";

const TestingPage = () => {
  const [testsData, setTestsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [ratesData, setRatesData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("total");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, testsResponse, ratesResponse] = await Promise.all([
          axios.get("http://localhost:5000/v3/api/customers"),
          axios.get("http://localhost:5000/v3/api/tests"),
          axios.get("http://localhost:5000/v3/api/rates"),
        ]);
        setCustomersData(customersResponse.data);
        setTestsData(testsResponse.data);
        setRatesData(ratesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = customersData;

    if (activeTab === "initiated") {
      filtered = filtered.filter((customer) =>
        testsData.some(test => test.customerId === customer._id && test.testStatus === "Initiated")
      );
    } else if (activeTab === "failed") {
      filtered = filtered.filter((customer) =>
        testsData.some(test => test.customerId === customer._id && test.testStatus === "Failed")
      );
    }

    if (filterStatus) {
      filtered = filtered.filter(customer =>
        testsData.some(test => test.customerId === customer._id && test.testStatus === filterStatus)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customerId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);

  };

  useEffect(() => {
    applyFilters();
  }, [activeTab, filterStatus, searchTerm]);

  const findTestsByCustomerId = (customerId) => {
    return testsData.filter((test) => test.customerId === customerId);
  };

  const findRateById = (rateId) => {
    return ratesData.find((rate) => rate._id === rateId) || {};
  };

  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const getTicketCount = (status) => {
    if (status === "total") return customersData.length;
    return testsData.filter(test => test.testStatus === status).length;
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 text-gray-800">
        <div className="flex items-center mb-6">
          <SiVitest className="h-10 w-10 text-orange-500 mr-4" />
          <h2 className="text-3xl text-gray-500 font-default">Testing Page</h2>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-between mb-6">
          {["total", "initiated", "failed"].map((status, index) => (
            <div
              key={status}
              className={`flex-1 ${
                index !== 0 ? "ml-4" : ""
              } bg-gradient-to-r ${
                status === "total"
                  ? "from-blue-400 to-blue-600"
                  : status === "initiated"
                  ? "from-green-400 to-green-600"
                  : "from-yellow-400 to-yellow-600"
              } text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
              onClick={() => setActiveTab(status)}
            >
              <h3 className="text-lg font-semibold">
                {status === "total" ? "Live" : status === "initiated" ? "Test Passed" : "Test Failed"}
              </h3>
              <p className="text-4xl font-bold mt-2">{getTicketCount(status)}</p>
            </div>
          ))}
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-6">
          {/* Left side: Status filter and filter button */}
          <div className="flex space-x-4">
            <select
              className="p-2 bg-white border rounded shadow"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Initiated">Test Initiated</option>
              <option value="Failed">Test Failed</option>
              <option value="Passed">Test Passed</option>
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={applyFilters}
            >
              Filter
            </button>
          </div>

          {/* Right side: Search input */}
          <div className="flex">
            <input
              type="text"
              className="p-2 border rounded shadow"
              placeholder="Search by Customer ID or Company Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* White Container for Tab Content */}
        <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-[#005F73] text-white">
              <tr>
                <th className="py-2 px-4">Customer ID</th>
                <th className="py-2 px-4">Company Name</th>
                <th className="py-2 px-4">Service Engineer</th>
                <th className="py-2 px-4 text-center">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((customer, index) => (
                <tr key={customer._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="py-2 px-4">{customer.customerId}</td>
                  <td className="py-2 px-4">{customer.companyName || "N/A"}</td>
                  <td className="py-2 px-4">Not assigned</td>
                  <td className="py-2 px-4">Test Initiated</td>
                  <td className="py-2 px-4 text-right">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
                      onClick={() => openModal(customer)}
                    >
                      View
                    </button>
                    <button
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                      onClick={() => alert(`Pickup action for ${customer.companyName}`)}
                    >
                      Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <SiBitcomet className="h-6 w-6 text-orange-500 mr-2" />
                <h3 className="text-xl font-default">Details for {selectedCustomer.companyName}</h3>
              </div>
              <button onClick={closeModal} className="text-gray-500 text-2xl">&times;</button>
            </div>
            <div className="max-w-screen-xl mx-auto p-5">
              <div className="min-w-full bg-white shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                  <thead className="bg-indigo-500 text-white">
                    <tr>
                      <th className="py-2 px-6 text-sm">Country Code</th>
                      <th className="py-2 px-6 text-sm">Country</th>
                      <th className="py-2 px-6 text-sm">Price</th>
                      <th className="py-2 px-6 text-sm">Description</th>
                      <th className="py-2 px-6 text-sm">Profile</th>
                      <th className="py-2 px-6 text-sm">Status</th>
                      <th className="py-2 px-6 text-sm">Test Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {findTestsByCustomerId(selectedCustomer._id).map((test, index) => {
                      const rate = findRateById(test.rateId);
                      return (
                        <tr key={test._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                          <td className="py-2 px-6 text-sm">{rate.countryCode || "N/A"}</td>
                          <td className="py-2 px-6 text-sm">{rate.country || "N/A"}</td>
                          <td className="py-2 px-6 text-sm">{rate.rate || "N/A"}</td>
                          <td className="py-2 px-6 text-sm">{rate.qualityDescription || "N/A"}</td>
                          <td className="py-2 px-6 text-sm">{rate.profile || "N/A"}</td>
                          <td className="py-2 px-6 text-sm">{rate.status || "N/A"}</td>
                          <td className="py-2 px-6 text-sm">{test.testStatus || "N/A"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TestingPage;