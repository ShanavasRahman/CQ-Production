import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaPlusCircle, FaFilter, FaTimes } from 'react-icons/fa';
import { MdAccountCircle, MdPerson, MdCategory, MdCheckCircle } from 'react-icons/md';
import { SiContributorcovenant } from 'react-icons/si';

const VendorRequestPage = () => {
  const initialRequests = [
    {
      id: 1,
      carrierId: 'V001',
      accountManager: 'Manager 1',
      serviceCategory: 'CC Route',
      accountAssociate: 'Associate 1',
      carriertype: 'Postpaid',
      status: 'Pending',
      countryCode: 'IN',
      countryName: 'India',
      qualityDescription: 'Modified display',
      rate: 200,
      targetedRate: 150,
      rateCategory: 'CLI Route',
    },
    {
      id: 2,
      carrierId: 'V002',
      accountManager: 'Manager 2',
      serviceCategory: 'CLI Route',
      accountAssociate: 'Associate 2',
      carriertype: 'Postpaid',
      status: 'Approved',
      countryCode: 'US',
      countryName: 'USA',
      qualityDescription: 'Modified display',
      rate: 150,
      targetedRate: 120,
      rateCategory: 'CC Route',
    },
    {
      id: 3,
      carrierId: 'V003',
      accountManager: 'Manager 3',
      serviceCategory: 'CC Route',
      accountAssociate: 'Associate 3',
      carriertype: 'Postpaid',
      status: 'Denied',
      countryCode: 'UK',
      countryName: 'United Kingdom',
      qualityDescription: 'Corrected display',
      rate: 100,
      targetedRate: 90,
      rateCategory: 'CLI Route',
    },
  ];

  const [vendorRequests, setVendorRequests] = useState(initialRequests);
  const [filteredRequests, setFilteredRequests] = useState(initialRequests);
  const [filter, setFilter] = useState('All');
  const [showAddVendorPaymentModal, setShowAddVendorPaymentModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [formValues, setFormValues] = useState({
    carrierId: '',
    accountManager: '',
    serviceCategory: 'CL',
    accountAssociate: '',
    status: 'Pending',
  });

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleFilterApply = () => {
    setFilteredRequests(
      filter === 'All'
        ? vendorRequests
        : vendorRequests.filter((request) => request.status === filter)
    );
  };

  const handlePickupClick = (request) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
    setShowStatusModal(true);
  };

  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const handleStatusUpdate = () => {
    setVendorRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === selectedRequest.id ? { ...request, status: newStatus } : request
      )
    );
    setFilteredRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === selectedRequest.id ? { ...request, status: newStatus } : request
      )
    );
    setShowStatusModal(false);
  };

  const handleCancel = () => {
    setShowAddVendorPaymentModal(false);
    setShowStatusModal(false);
    setShowViewModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSavePayment = () => {
    const newRequest = { ...formValues, id: vendorRequests.length + 1 };
    setVendorRequests([...vendorRequests, newRequest]);
    setFilteredRequests([...vendorRequests, newRequest]);
    setShowAddVendorPaymentModal(false);
  };

  return (
    <Layout>
      <div className="p-6 text-gray-600">
        <h2 className="text-3xl font-default flex items-center mb-4">
          <SiContributorcovenant className="mr-2 text-yellow-500 text-5xl" />
          Vendor Payment Requests
        </h2>

        <div className="flex justify-between mb-4 items-center">
          <button
            onClick={() => setShowAddVendorPaymentModal(true)}
            className="px-4 py-2 bg-green-500 text-white flex items-center rounded-md"
          >
            <FaPlusCircle className="mr-2" />
            Add Vendor Payment
          </button>

          <div className="flex items-center">
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
        </div>

        <table className="min-w-full border-collapse mb-6">
          <thead className="bg-[#005F73] text-white">
            <tr>
              <th className="p-2">Carrier ID</th>
              <th className="p-2">Account Manager</th>
              <th className="p-2">Service Category</th>
              <th className="p-2">Account Associate</th>
              <th className="p-2">Carrier Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request, index) => (
              <tr key={request.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="p-2">{request.carrierId}</td>
                <td className="p-2 text-center">{request.accountManager}</td>
                <td className="p-2 text-center">{request.serviceCategory}</td>
                <td className="p-2">{request.accountAssociate}</td>
                <td className="p-2">{request.carriertype}</td>
                <td className="p-2">{request.status}</td>
                <td className="p-2 text-right flex justify-end space-x-2">
                  <button
                    onClick={() => handlePickupClick(request)}
                    className="px-4 py-2 bg-blue-500 text-white flex items-center rounded-md"
                  >
                    Pickup
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAddVendorPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 w-1/3">
              <h3 className="text-lg font-default mb-4">Add Payment</h3>
              <div className="mb-4 flex items-center">
                <MdAccountCircle className="mr-2 text-gray-600" />
                <input
                  type="text"
                  name="carrierId"
                  value={formValues.carrierId}
                  onChange={handleInputChange}
                  placeholder="Carrier ID"
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4 flex items-center">
                <MdPerson className="mr-2 text-gray-600" />
                <input
                  type="text"
                  name="accountManager"
                  value={formValues.accountManager}
                  onChange={handleInputChange}
                  placeholder="Account Manager"
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4 flex items-center">
                <MdPerson className="mr-2 text-gray-600" />
                <input
                  type="text"
                  name="accountManager"
                  value={formValues.carriertype}
                  onChange={handleInputChange}
                  placeholder="Carrier Type"
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4 flex items-center">
                <MdCategory className="mr-2 text-gray-600" />
                <select
                  name="serviceCategory"
                  value={formValues.serviceCategory}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="CL">CLI Route</option>
                  <option value="CC">CC Route</option>
                </select>
              </div>
              <div className="mb-4 flex items-center">
                <MdPerson className="mr-2 text-gray-600" />
                <input
                  type="text"
                  name="accountAssociate"
                  value={formValues.accountAssociate}
                  onChange={handleInputChange}
                  placeholder="Account Associate"
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4 flex items-center">
                <MdCheckCircle className="mr-2 text-gray-600" />
                <select
                  name="status"
                  value={formValues.status}
                  onChange={handleInputChange}
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
                  onClick={handleSavePayment}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Save Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VendorRequestPage;