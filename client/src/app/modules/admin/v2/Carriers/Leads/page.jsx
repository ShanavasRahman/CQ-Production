import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../layout/page";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import {
  FunnelIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowLeftStartOnRectangleIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [leadStatusFilter, setLeadStatusFilter] = useState("");

  console.log(leadStatusFilter,'leadStatusFilter');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/v3/api/customers"
        );
        const filteredCustomers = response.data.filter(
          (customer) => customer.customerType === "CarrierLead"
        );
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleSearch = (event) => setSearch(event.target.value);
  const handleFilter = (status) => setLeadStatusFilter(status);
  const handleRowClick = (customerId) => navigate(`/admin/customer/lead-details/${customerId}`);
  // Filter customers based on search and lead status
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesStatus =
        leadStatusFilter === "" || customer.leadStatus === leadStatusFilter;
      const matchesSearch = Object.values(customer || {}).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      );
      return matchesStatus && matchesSearch;
    });
  }, [customers, search, leadStatusFilter]);

  const leadStatuses = ["new", "hot", "junk", "active", "inactive"];



  return (
    <div>
      <Layout>
        {/* Navbar */}
        <div className="flex items-center px-6 py-4">
          {/* Icon */}
          <div className="bg-orange-500 rounded-full p-3 flex items-center justify-center">
            <ChartBarIcon className="text-white w-8 h-8" />
          </div>
          {/* Heading aligned left */}
          <h1 className="text-xl font-bold text-gray-800 ml-2">
            LEAD MANAGEMENT
          </h1>
        </div>

        {/* Filters and Search */}
        <div className="flex justify-end items-center mt-2 space-x-4">
          {/* Sort By Search Bar */}
          <div className="relative">
            <div
              className="flex items-center bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-48 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-sm">{leadStatusFilter || "All"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 ml-auto text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <div className="absolute top-12 left-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg w-48 z-10">
                <ul className="divide-y divide-gray-200">
                  <li>
                    <button
                      onClick={() => {
                        handleFilter("");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      All
                    </button>
                  </li>

                  {leadStatuses.map((status) => (
                    <li key={status}>
                      <button
                        onClick={() => {
                          handleFilter(status);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        {status}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Filter Button */}
          <div className="relative group">
            <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm">
              <FunnelIcon className="w-5 h-5 mr-2" />
              <span className="text-sm">FILTER</span>
            </button>
          </div>
        </div>

        {/* Search Bar and Buttons */}
        <div className="relative flex items-center mt-6 px-6 space-x-4">
          {/* Add Lead Button */}
          <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm">
            <UsersIcon className="w-5 h-5 mr-2" />
           <Link to="/Addlead"><span className="text-sm">ADD LEAD</span></Link> 
          </button>

          {/* Search Bar */}
          <div className="flex items-center bg-white border border-red-500 rounded-lg px-4 py-2 max-w-lg w-full">
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-blue-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-gray-700 focus:outline-none ml-2 w-full"
              value={search}
              onChange={handleSearch}
            />
          </div>

          {/* Search Button */}
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
            <StopCircleIcon className="w-5 h-5 mr-2" />
            <span className="text-sm">SEARCH</span>
          </button>
        </div>

        {/* Customer Table */}
        <div className="bg-white shadow-md rounded-lg mt-6">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Loading...</p>
          ) : (
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-yellow-500 text-white">
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">Contact Person</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      onClick={() => handleRowClick(customer._id)}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="py-3 px-4">{customer.companyName}</td>
                      <td className="py-3 px-4">{customer.contactPerson}</td>
                      <td className="py-3 px-4">{customer.userEmail}</td>
                      <td className="py-3 px-4">{customer.country}</td>
                      <td className="py-3 px-4">{customer.leadStatus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default CustomersPage;
