import React, { useState } from 'react';
import Layout from '../../layout/page';
import { MdOutlineSearch } from 'react-icons/md';
import { TbSquareRoundedFilled } from "react-icons/tb"; // Importing the icon

// Placeholder data for the DID enquiries table
const didEnquiryData = [
  {
    id: 1,
    name: 'John Doe',
    companyName: 'ABC Corp',
    email: 'johndoe@abccorp.com',
    contactNumber: '+1234567890',
    timeZone: 'IST',
    noOfDID: 5,
    noOfUsers: 10,
    selectedCountry: 'India',
    enquiryDate: '12/15/2024',
  },
  {
    id: 2,
    name: 'Jane Smith',
    companyName: 'XYZ Ltd',
    email: 'janesmith@xyzltd.com',
    contactNumber: '+0987654321',
    timeZone: 'PST',
    noOfDID: 3,
    noOfUsers: 8,
    selectedCountry: 'USA',
    enquiryDate: '01/10/2025',
  },
];

const Didnumberenquiery = () => {
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
        {/* Table Heading with Icon */}
        <div className="flex items-center mb-6">
          <MdOutlineSearch className="h-8 w-8 text-teal-500 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-800">DID Enquiries</h2>
        </div>

        {/* Table for DID Enquiries */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-4 text-sm font-medium">Name</th>
                <th className="py-3 px-4 text-sm font-medium">Company</th>
                <th className="py-3 px-4 text-sm font-medium">Email</th>
                <th className="py-3 px-4 text-sm font-medium">Country</th>
                <th className="py-3 px-4 text-sm font-medium">Enquiry Date</th>
                <th className="py-3 px-4 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {didEnquiryData.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4">{enquiry.name}</td>
                  <td className="py-3 px-4">{enquiry.companyName}</td>
                  <td className="py-3 px-4">{enquiry.email}</td>
                  <td className="py-3 px-4">{enquiry.selectedCountry}</td>
                  <td className="py-3 px-4">{enquiry.enquiryDate}</td>
                  <td className="py-3 px-4 flex justify-end space-x-2">
                    <button
                      className="bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                      onClick={() => openModal(enquiry)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
                      onClick={() => alert(`Pickup initiated for ${enquiry.name}`)}
                    >
                      Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Viewing Enquiry Details */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 max-w-lg">
              {/* Modal Header with Icon and Close Button */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <TbSquareRoundedFilled className="h-8 w-8 text-teal-500 mr-3" />
                  <h3 className="text-2xl font-semibold text-teal-600">DID Enquiry Details</h3>
                </div>
                <button onClick={closeModal} className="text-gray-500 text-3xl">&times;</button>
              </div>

              {/* Simplified Enquiry Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Contact Number:</span>
                  <span className="text-sm text-gray-600">{selectedEnquiry.contactNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Number of Users:</span>
                  <span className="text-sm text-gray-600">{selectedEnquiry.noOfUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Number of DIDs:</span>
                  <span className="text-sm text-gray-600">{selectedEnquiry.noOfDID}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Time Zone:</span>
                  <span className="text-sm text-gray-600">{selectedEnquiry.timeZone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Country:</span>
                  <span className="text-sm text-gray-600">{selectedEnquiry.selectedCountry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Enquiry Date:</span>
                  <span className="text-sm text-gray-600">{selectedEnquiry.enquiryDate}</span>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                  onClick={() => alert('Further actions can be done here')}
                >
                  Take Action
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Didnumberenquiery;