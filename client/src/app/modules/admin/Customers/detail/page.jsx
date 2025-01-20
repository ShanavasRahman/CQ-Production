import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDetailsPage = () => {
  const [customer, setCustomer] = useState(null);
  const customerId = window.location.pathname.split('/').pop(); // Get the customer ID from the URL

  useEffect(() => {
    if (customerId) {
      // Fetch the customer details based on the ID
      const fetchCustomerDetails = async () => {
        try {
          const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${customerId}`);
          setCustomer(response.data);
        } catch (error) {
          console.error('Error fetching customer details:', error);
        }
      };

      fetchCustomerDetails();
    }
  }, [customerId]);

  if (!customer) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Customer Details</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Company Information</h2>
        <p><strong>Company Name:</strong> {customer.companyName}</p>
        <p><strong>Company Email:</strong> {customer.companyEmail}</p>
        <p><strong>Contact Person:</strong> {customer.contactPerson}</p>
        <p><strong>Country:</strong> {customer.country}</p>
        <p><strong>Company Phone:</strong> {customer.companyPhone}</p>

        <h2 className="text-xl font-semibold mb-4 text-indigo-600 mt-6">User Information</h2>
        <p><strong>First Name:</strong> {customer.userFirstname}</p>
        <p><strong>Last Name:</strong> {customer.userLastname}</p>
        <p><strong>Username:</strong> {customer.username}</p>
        <p><strong>Email:</strong> {customer.userEmail}</p>
        <p><strong>Mobile:</strong> {customer.userMobile}</p>

        <h2 className="text-xl font-semibold mb-4 text-indigo-600 mt-6">Technical Information</h2>
        <p><strong>SIP Support:</strong> {customer.sipSupport}</p>
        <p><strong>Codex:</strong> {customer.codex}</p>
        <p><strong>Switch IPs:</strong> {customer.switchIps.join(', ')}</p>

        <h2 className="text-xl font-semibold mb-4 text-indigo-600 mt-6">Status Information</h2>
        <p><strong>Customer Type:</strong> {customer.customerType}</p>
        <p><strong>Status:</strong> {customer.customerStatus}</p>
        <p><strong>Lead Status:</strong> {customer.leadStatus}</p>
        <p><strong>Lead Type:</strong> {customer.leadType}</p>
        <p><strong>Created At:</strong> {new Date(customer.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
