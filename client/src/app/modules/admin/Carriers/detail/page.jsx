import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarrierDetailsPage = () => {
  const [carrier, setCarrier] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    // Get the ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const carrierId = urlParams.get('id');
    setId(carrierId);

    if (carrierId) {
      // Fetch the carrier details based on the ID
      const fetchCarrierDetails = async () => {
        try {
          const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${carrierId}`);
          setCarrier(response.data);
        } catch (error) {
          console.error('Error fetching carrier details:', error);
        }
      };

      fetchCarrierDetails();
    }
  }, []);

  if (!carrier) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Carrier Details</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Company Information</h2>
        <p><strong>Company Name:</strong> {carrier.companyName}</p>
        <p><strong>Company Email:</strong> {carrier.companyEmail}</p>
        <p><strong>Contact Person:</strong> {carrier.contactPerson}</p>
        <p><strong>Country:</strong> {carrier.country}</p>
        <p><strong>Company Phone:</strong> {carrier.companyPhone}</p>

        <h2 className="text-xl font-semibold mb-4 text-indigo-600 mt-6">User Information</h2>
        <p><strong>First Name:</strong> {carrier.userFirstname}</p>
        <p><strong>Last Name:</strong> {carrier.userLastname}</p>
        <p><strong>Username:</strong> {carrier.username}</p>
        <p><strong>Email:</strong> {carrier.userEmail}</p>
        <p><strong>Mobile:</strong> {carrier.userMobile}</p>

        <h2 className="text-xl font-semibold mb-4 text-indigo-600 mt-6">Technical Information</h2>
        <p><strong>SIP Support:</strong> {carrier.sipSupport}</p>
        <p><strong>Codex:</strong> {carrier.codex}</p>
        <p><strong>Switch IPs:</strong> {carrier.switchIps.join(', ')}</p>

        <h2 className="text-xl font-semibold mb-4 text-indigo-600 mt-6">Status Information</h2>
        <p><strong>Customer Type:</strong> {carrier.customerType}</p>
        <p><strong>Status:</strong> {carrier.customerStatus}</p>
        <p><strong>Lead Status:</strong> {carrier.leadStatus}</p>
        <p><strong>Lead Type:</strong> {carrier.leadType}</p>
        <p><strong>Created At:</strong> {new Date(carrier.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default CarrierDetailsPage;
