import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaPlusCircle, FaFilter } from 'react-icons/fa';
import { BsBullseye } from "react-icons/bs";

import { RiApps2Line } from 'react-icons/ri';

const OverdraftRequestPage = () => {
  const [overdraftRequests, setOverdraftRequests] = useState([
    { id: 1, customerId: 'C001', accountManager: 'Manager 1', clientType: 'New', reason: 'Urgent Need', amount: 500, status: 'Pending' },
    { id: 2, customerId: 'C002', accountManager: 'Manager 2', clientType: 'Existing', reason: 'Business Expansion', amount: 300, status: 'Approved' },
    { id: 3, customerId: 'C003', accountManager: 'Manager 3', clientType: 'New', reason: 'Personal Emergency', amount: 200, status: 'Denied' },
  ]);

  const [filteredRequests, setFilteredRequests] = useState(overdraftRequests);
  const [filter, setFilter] = useState('All');
  const [showAddOverdraftModal, setShowAddOverdraftModal] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [newOverdraft, setNewOverdraft] = useState({ customerId: '', accountManager: '', clientType: '', reason: '', amount: '', status: 'Pending' });
  const [selectedOverdraft, setSelectedOverdraft] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  // Handle filter change and apply filter on button click
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterApply = () => {
    if (filter === 'All') {
      setFilteredRequests(overdraftRequests);
    } else {
      setFilteredRequests(overdraftRequests.filter(request => request.status === filter));
    }
  };

  // Handle input changes for new overdraft
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOverdraft({ ...newOverdraft, [name]: value });
  };

  // Add new overdraft request
  const handleAddOverdraft = () => {
    setOverdraftRequests([...overdraftRequests, { ...newOverdraft, id: overdraftRequests.length + 1 }]);
    setFilteredRequests([...overdraftRequests, { ...newOverdraft, id: overdraftRequests.length + 1 }]);
    setShowAddOverdraftModal(false);
  };

  // Handle Pickup button click
  const handlePickupClick = (overdraft) => {
    setSelectedOverdraft(overdraft);
    setNewStatus(overdraft.status);
    setShowPickupModal(true);
  };

  // Update overdraft status
  const handleUpdateStatus = () => {
    setOverdraftRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === selectedOverdraft.id ? { ...request, status: newStatus } : request
      )
    );
    setFilteredRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === selectedOverdraft.id ? { ...request, status: newStatus } : request
      )
    );
    setShowPickupModal(false);
  };

  // Cancel and close modals
  const handleCancel = () => {
    setShowAddOverdraftModal(false);
    setShowPickupModal(false);
  };

  return (
    <Layout>
      <div className="p-6 text-gray-600">
        <h2 className="text-3xl font-semibold flex items-center mb-4">
          <BsBullseye className="mr-2 text-yellow-500 text-5xl" />
         Overdraft Requests
        </h2>

        {/* Add Overdraft Button */}
        <button
          onClick={() => setShowAddOverdraftModal(true)}
          className="px-4 py-2 bg-green-500 text-white flex items-center rounded-md mb-4"
        >
          <FaPlusCircle className="mr-2" />
          Add Overdraft
        </button>

        {/* Filter Dropdown with Button */}
        <div className="flex justify-end mb-4 items-center">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border rounded-md bg-white mr-2"
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
            <option value="Pending">Pending</option>
          </select>
          <button
            onClick={handleFilterApply}
            className="px-4 py-2 bg-orange-500 text-white flex items-center rounded-md"
          >
            <FaFilter className="mr-2" />
            Filter
          </button>
        </div>

        {/* Overdraft Table */}
        <table className="min-w-full border-collapse mb-6">
          <thead className="bg-[#005F73] text-white">
            <tr>
              <th className="p-2">Customer ID</th>
              <th className="p-2">Account Manager</th>
              <th className="p-2">Client Type</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request.id} className="bg-gray-100">
                <td className="p-2">{request.customerId}</td>
                <td className="p-2">{request.accountManager}</td>
                <td className="p-2">{request.clientType}</td>
                <td className="p-2">{request.reason}</td>
                <td className="p-2">${request.amount}</td>
                <td className="p-2">{request.status}</td>
                <td className="p-2 text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handlePickupClick(request)}
                      className="px-4 py-2 w-36 bg-blue-500 text-white flex items-center justify-center rounded-md"
                    >
                      <FaPlusCircle className="mr-2" />
                      Pickup
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Overdraft Modal */}
        {showAddOverdraftModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 w-1/3">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaPlusCircle className="mr-2 text-green-500" />
                Add Overdraft
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer ID</label>
                <input
                  name="customerId"
                  value={newOverdraft.customerId}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Manager</label>
                <input
                  name="accountManager"
                  value={newOverdraft.accountManager}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Type</label>
                <select
                  name="clientType"
                  value={newOverdraft.clientType}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="New">New</option>
                  <option value="Existing">Existing</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <select
                  name="reason"
                  value={newOverdraft.reason}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="Test">Test overdraft</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Management Approved">Management Approved</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  name="amount"
                  type="number"
                  value={newOverdraft.amount}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOverdraft}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Add Overdraft
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pickup Modal */}
        {showPickupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 w-1/3">
              <h3 className="text-lg font-semibold mb-4">Change Status</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Change Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OverdraftRequestPage;