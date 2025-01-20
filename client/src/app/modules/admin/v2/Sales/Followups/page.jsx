import React, { useState, useEffect } from "react";
import Layout from "../../layout/page"; // Assuming Layout is a regular React component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faFilter } from '@fortawesome/free-solid-svg-icons';
// Import only necessary 
import { FaArrowAltCircleDown, FaPhone } from "react-icons/fa";
import {  Mail, MessageSquare } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FollowUp = () => {
  const [activeTab, setActiveTab] = useState("call");
  const [followUpData, setFollowUpData] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  console.log("hello im in followup");
  // Fetch follow-up data and customer data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Step 1: Fetch follow-up data
        const followUpsResponse = await axios.get('http://localhost:5000/v3/api/followups');
        const followUps = followUpsResponse.data; // Only use the data part
        console.log(followUps);
        setFollowUpData(followUps);
  
        // Step 2: Prepare a list of unique, valid customer IDs
        const customerIds = [...new Set(followUps.map(item => item.customerId))].filter(
          id => id && id.trim() !== ""
        );
        console.log(customerIds);
  
        // Step 3: Fetch customer data for all customer IDs concurrently
        const customerRequests = customerIds.map(customerId =>
          axios
            .get(`http://localhost:5000/v3/api/customers/${customerId}`)
            .then(response => ({ id: customerId, data: response.data }))
            .catch(err => {
              console.error(`Failed to fetch data for customer ${customerId}:`, err.message);
              return { id: customerId, data: null }; // Handle errors per customer
            })
        );
        
        const customersArray = await Promise.all(customerRequests);
        console.log(customersArray);
  
        // Convert to an object with customerId as the key
        const customers = customersArray.reduce((acc, { id, data }) => {
          if (data) acc[id] = data;
          return acc;
        }, {});
        setCustomerData(customers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array means this will run only once on component mount
  

  const renderTabContent = () => {
    if (loading) return <div className="text-center py-4 text-gray-600">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

    const filteredFollowUps = followUpData.filter(
      (item) => item.followupMethod === activeTab && item.followupCategory === "Leads"
    );

    if (filteredFollowUps.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          No follow-ups for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}.
        </div>
      );
    }
    const handleRowClick = (followupId) => navigate(`/admin/detailfollowup/${followupId}`);

    return (
      <table className="min-w-full mt-4 bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-yellow-500 text-white">
            <th className="border px-4 py-2">Customer ID</th>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Follow-Up Type</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFollowUps.map((followUp) => {
            const customer = customerData[followUp.customerId] || {};
            return (
              <tr
                key={followUp.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(followUp._id)}
              >
                <td className="border px-4 py-2">{customer.customerId || "N/A"}</td>
                <td className="border px-4 py-2">
                  <a

                  >
                    {customer.companyName || "N/A"}
                  </a>
                </td>
                <td className="border px-4 py-2 capitalize">{followUp.followupMethod}</td>
                <td className="border px-4 py-2">{followUp.followupStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <Layout>
      <div className="p-8 text-gray-900 min-h-screen">
        {/* Header with Icon */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-orange-500 rounded-full p-3 flex items-center justify-center">
            <FaArrowAltCircleDown className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Follow Up</h1>
        </div>

        {/* Filter and Sort By Section */}
        <div style={{display:"flex",justifyContent:"space-between",textAlign:"center"}} className="space-x-4 mb-6">

          <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
            <FontAwesomeIcon icon={faPlus} className="text-white mr-2" />
            <span>Add Follow Up </span>
          </button>

          <div className="flex justify-end items-center space-x-4 ">
            {/* Sort By */}
            <div className="relative flex items-center bg-gray-200 px-4 py-2 rounded-lg shadow-md">
              <span className="text-gray-500 mr-2">🔽</span>
              <select className="bg-transparent focus:outline-none text-gray-700">
                <option value="recent">Sort By: Today</option>
                <option value="oldest">Sort By: Pending</option>
              </select>
            </div>

            {/* Filter */}
            <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              <FontAwesomeIcon icon={faFilter} className="text-white mr-2"/>
              <span>Filter</span>
            </button>
          </div>
        </div>


        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-6 mb-6">
          {[
            { tab: "call", icon: <FaPhone className="w-6 h-6 text-orange-500" />, label: "Call" },
            { tab: "email", icon: <Mail className="w-6 h-6 text-red-500" />, label: "Email" },
            { tab: "chat", icon: <MessageSquare className="w-6 h-6 text-red-500" />, label: "Chat" },
          ].map(({ tab, icon, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-8 flex items-center justify-center space-x-3 rounded-lg shadow-lg transition-transform transform ${activeTab === tab
                  ? "scale-105 text-grey"
                  : "hover:bg-gray-300 text-gray-800"
                } ${tab === "call"
                  ? activeTab === tab
                    ? "bg-orange-200"
                    : "bg-grey-200"
                  : tab === "email"
                    ? activeTab === tab
                      ? "bg-blue-200"
                      : "bg-grey-200"
                    : tab === "chat"
                      ? activeTab === tab
                        ? "bg-pink-200"
                        : "bg-grey-200"
                      : ""
                }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-lg font-medium">{label}</span>
            </button>
          ))}
        </div>


        {/* Tab Content */}
        <div className="overflow-x-auto">{renderTabContent()}</div>
      </div>
    </Layout>
  );
};

export default FollowUp;
