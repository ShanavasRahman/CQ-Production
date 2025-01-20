import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaFilter, FaTimes, FaPlus, FaDollarSign } from 'react-icons/fa';
import { LuBadgeDollarSign } from "react-icons/lu";

const PrivateRateRequestPage = () => {
  const [requests, setRequests] = useState([
    { id: 1, carrierId: 'C001', accountManager: 'John Doe', serviceCategory: 'CLI Routes', accountAssociate: 'Jane Smith', status: 'Pending' },
    { id: 2, carrierId: 'C002', accountManager: 'Alice Brown', serviceCategory: 'CLI Routes', accountAssociate: 'Mark Johnson', status: 'Approved' },
    { id: 3, carrierId: 'C003', accountManager: 'Chris Green', serviceCategory: 'CC Routes', accountAssociate: 'Emily White', status: 'Denied' },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState('cc');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const handlePickupClick = (request) => {
    console.log(`Pickup requested for Carrier ID: ${request.carrierId}`);
  };

  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const filteredRequests = filterStatus === 'All' ? requests : requests.filter((request) => request.status === filterStatus);

  const handleAddRequest = () => {
    console.log("Add Private Request");
  };

  return (
    <Layout>
      <div className="p-6 text-gray-600">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <LuBadgeDollarSign className="mr-2 text-yellow-500 text-5xl" />
            <h2 className="text-3xl font-semibold">Private Rate Requests</h2>
          </div>
        </div>

        <div className="flex justify-end items-center mb-6">
          <div className="flex items-center">
            <select
              value={filterStatus}
              onChange={handleFilterChange}
              className="p-2 border rounded-md bg-white mr-2"
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
              <option value="Pending">Pending</option>
            </select>
            <button
              className="px-4 py-2 bg-orange-500 text-white flex items-center rounded-md"
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <table className="min-w-full border-collapse mb-6">
          <thead className="bg-[#005F73] text-white">
            <tr>
              <th className="p-2">Carrier ID</th>
              <th className="p-2">Account Manager</th>
              <th className="p-2">Service Category</th>
              <th className="p-2">Account Associate</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request, index) => (
              <tr key={request.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="p-2">{request.carrierId}</td>
                <td className="p-2">{request.accountManager}</td>
                <td className="p-2">{request.serviceCategory}</td>
                <td className="p-2">{request.accountAssociate}</td>
                <td className="p-2">{request.status}</td>
                <td className="p-2 flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewClick(request)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handlePickupClick(request)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Pickup
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showViewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 w-2/3 relative">
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                <FaTimes className="text-2xl" />
              </button>

              <h3 className="text-lg font-semibold mb-4">Rates Details</h3>
              <div className="flex mb-4">
                <button
                  onClick={() => setActiveViewTab('cc')}
                  className={`px-4 py-2 rounded-md ${activeViewTab === 'cc' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'}`}
                >
                  CC Routes
                </button>
                <button
                  onClick={() => setActiveViewTab('cli')}
                  className={`px-4 py-2 rounded-md ${activeViewTab === 'cli' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'}`}
                >
                  CLI Routes
                </button>
              </div>

              {activeViewTab === 'cc' && (
                <table className="w-full border-collapse mb-6">
                  <thead className="bg-yellow-500 text-white">
                    <tr>
                      <th className="p-2">Country Code</th>
                      <th className="p-2">Country Name</th>
                      <th className="p-2">Quality Description</th>
                      <th className="p-2">Profile</th>
                      <th className="p-2">Rate</th>
                      <th className="p-2">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white text-center">
                      <td className="p-2">IN</td>
                      <td className="p-2">India</td>
                      <td className="p-2">High Quality</td>
                      <td className="p-2">IVR</td>
                      <td className="p-2">200</td>
                      
                      <td className="p-2">active</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeViewTab === 'cli' && (
                <table className="w-full border-collapse">
                  <thead className="bg-yellow-500 text-white">
                    <tr>
                      <th className="p-2">Country Code</th>
                      <th className="p-2">Country Name</th>
                      <th className="p-2">Quality Description</th>
                      <th className="p-2">RTP</th>
                      <th className="p-2">ASR</th>
                      <th className="p-2">ACD</th>
                      <th className="p-2">Rate</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white text-center">
                      <td className="p-2">US</td>
                      <td className="p-2">USA</td>
                      <td className="p-2">Moderate Quality</td>
                      <td className="p-2">95</td>
                      <td className="p-2">85</td>
                      <td className="p-2">220</td>
                      <td className="p-2">150</td>
                      <td className="p-2">Active</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PrivateRateRequestPage;