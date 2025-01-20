import React, { useState, useEffect } from 'react';
import Layout from '../../layout/page';
import { FaTicketAlt, FaPlus, FaTabletAlt, FaTencentWeibo, FaIdCard, FaReact, FaRecordVinyl, FaStreetView, FaUpload, FaBitcoin, FaServicestack } from 'react-icons/fa';

const FollowUp = () => {
  const [followUpData, setFollowUpData] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All'); // Filter status
  const [searchQuery, setSearchQuery] = useState(''); // Search by issue

  useEffect(() => {
    setLoading(true);

    const mockFollowUps = [
      {
        id: '1',
        customerId: '123',
        issue: 'Slow network speed',
        followupStatus: 'Pending',
        priority: 'High',
      },
      {
        id: '2',
        customerId: '124',
        issue: 'Unable to connect to VPN',
        followupStatus: 'Process',
        priority: 'Medium',
      },
      {
        id: '3',
        customerId: '125',
        issue: 'Frequent disconnections',
        followupStatus: 'Completed',
        priority: 'Low',
      },
    ];

    const mockCustomerData = {
      '123': {
        accountManager: 'John Doe',
        supportEngineer: 'Jane Smith',
      },
      '124': {
        accountManager: 'Sarah Connor',
        supportEngineer: 'Kyle Reese',
      },
      '125': {
        accountManager: 'James Cameron',
        supportEngineer: 'Ellen Ripley',
      },
    };

    setTimeout(() => {
      setFollowUpData(mockFollowUps);
      setCustomerData(mockCustomerData);
      setLoading(false);
    }, 1000);
  }, []);

  const totalTickets = followUpData.length;
  const liveTickets = followUpData.filter((ticket) => ticket.followupStatus === 'Process').length;

  const filteredFollowUps = followUpData.filter(
    (item) =>
      (filterStatus === 'All' || item.followupStatus === filterStatus) &&
      (item.issue?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  return (
    <Layout>
      <div className="p-8 text-gray-900 min-h-screen">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <FaServicestack className="text-6xl text-orange-500" />
            <h2 className="text-4xl text-gray-600">Trouble Tickets</h2>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="flex justify-between mb-6">
          <div className="flex-1 mr-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold">Total Tickets</h3>
            <p className="text-4xl font-bold mt-2">{totalTickets}</p>
          </div>
          <div className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold">Live Tickets</h3>
            <p className="text-4xl font-bold mt-2">{liveTickets}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex items-center space-x-4">
            <input
              type="text"
              className="px-4 py-2 rounded-lg border shadow w-64 focus:outline-none"
              placeholder="Search by issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 rounded-lg border shadow focus:outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Process">Process</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 flex items-center">
              <FaPlus className="mr-2" /> Create Ticket
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-yellow-300">
                <th className="border px-5 py-3 text-left">Customer ID</th>
                <th className="border px-5 py-3 text-left">Account Manager</th>
                <th className="border px-5 py-3 text-left">Issues</th>
                <th className="border px-5py-3 text-left">Support Engineer</th>
                <th className="border px-5 py-3 text-left">Status</th>
                <th className="border px-5 py-3 text-left">Priority</th>
                <th className="border px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-600">
                    Loading...
                  </td>
                </tr>
              ) : filteredFollowUps.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-600">
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredFollowUps.map((followUp) => {
                  const customer = customerData[followUp.customerId] || {};
                  return (
                    <tr key={followUp.id} className="hover:bg-gray-100">
                      <td className="border px-6 py-3">{followUp.customerId || 'N/A'}</td>
                      <td className="border px-6 py-3">{customer.accountManager || 'N/A'}</td>
                      <td className="border px-6 py-3">{followUp.issue || 'N/A'}</td>
                      <td className="border px-6 py-3">{customer.supportEngineer || 'N/A'}</td>
                      <td className="border px-6 py-3">{followUp.followupStatus || 'N/A'}</td>
                      <td className="border px-6 py-3">{followUp.priority || 'N/A'}</td>
                      <td className="border px-6 py-3 space-x-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600">
                          Pickup
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default FollowUp;