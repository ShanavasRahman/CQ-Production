import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaSearch } from 'react-icons/fa'; // Import the icon you prefer

// Placeholder data for the enquiry table
const enquiryData = [
  {
    id: 1,
    name: 'John Doe',
    companyName: 'ABC Corp',
    contactNumber: '+1234567890',
    email: 'johndoe@abccorp.com',
    description: 'Details about the enquiry 1...',
  },
  {
    id: 2,
    name: 'Jane Smith',
    companyName: 'XYZ Ltd',
    contactNumber: '+0987654321',
    email: 'janesmith@xyzltd.com',
    description: 'Details about the enquiry 2...',
  },
  // Add more entries as needed
];

const EnquiryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const openModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 text-gray-800">
        {/* Enquiry Details Heading with Icon */}
        <div className="flex items-center mb-4">
          <FaSearch className="text-blue-500 mr-2" size={24} />
          <h2 className="text-2xl font-bold">Enquiry Details</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-[#005F73]  text-white">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Company Name</th>
                <th className="py-2 px-4">Contact Number</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiryData.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-2 px-4">{enquiry.name}</td>
                  <td className="py-2 px-4">{enquiry.companyName}</td>
                  <td className="py-2 px-4">{enquiry.contactNumber}</td>
                  <td className="py-2 px-4">{enquiry.email}</td>
                  <td className="py-2 px-4 flex justify-end">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => openModal(enquiry)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => alert('Pickup initiated for ' + enquiry.name)}
                    >
                      Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Modal for showing enquiry description only */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Enquiry Description</h3>
                <button onClick={closeModal} className="text-gray-500 text-2xl">&times;</button>
              </div>
              <div className="mb-4">
                <p><strong>Description:</strong> {selectedEnquiry.description}</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EnquiryPage;