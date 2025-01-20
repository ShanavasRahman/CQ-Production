import React, { useState } from 'react';
import Layout from '../../../layout/page'; // Import Layout component

const ForumForm = () => {
  const [activeTab, setActiveTab] = useState('details');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[100vh] p-4"> {/* Increased height to 100vh */}
        <div className="max-w-[1200px] min-h-[85vh] w-full bg-white shadow-lg rounded-lg flex"> {/* Increased width */}


          {/* Static Cover Image */}
          <div className="w-1/2 p-4 flex justify-center items-center">
            <div
              className="bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: 'url(https://img.freepik.com/free-vector/credit-assessment-concept-illustration_114360-7282.jpg?t=st=1736889436~exp=1736893036~hmac=73d6e54a2e3bf8c3c9d73aa2fbcda7e300274b35d8215b44500cd8e24b4ca7d8&w=740)',
                height: '450px',  // Adjusted height of the image
                width: '500px',   // Adjusted width of the image
              }}
            >
              {/* Cover Image */}
            </div>
          </div>

          <div className="w-1/2 p-9">
            {/* Tab Navigation */}
            <div className="flex justify-between border-b mb-6">
              <button
                onClick={() => handleTabSwitch('details')}
                className={`py - 3 px-6 font-semibold ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
              Carrier Details
            </button>
            <button
              onClick={() => handleTabSwitch('payment')}
              className={`py - 3 px-6 font-semibold ${activeTab === 'payment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              >
            Payment Details
          </button>
        </div>

        {/* Details Form */}
        {activeTab === 'details' && (
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Carrier ID</label>
                <input type="text" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Manager</label>
                <input type="text" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Service Category </label>
                <select className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3">
                  <option value="option1">CC Routes</option>
                  <option value="option2">CLI Routes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Associate</label>
                <input type="text" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Carrier Type </label>
                <select className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3">
                  <option value="option1">postpaid</option>
                  <option value="option2">prepaid</option>
                </select>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                  <input type="file" accept="image/*" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3" />
                </div>

              </div>

            </div>

            <button type="button" onClick={() => handleTabSwitch('payment')} className="bg-blue-500 text-white px-12 py-3 rounded-md mt-6">
              Next
            </button>
          </form>
        )}

        {/* Payment Form */}
        {activeTab === 'payment' && (
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method </label>

                <select className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3">
                  <option value="option1">USDT</option>
                  <option value="option2">BANK</option>
                  <option value="option2">Route Exchange</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Amount</label>
                <input type="number" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <input type="text" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">USDT LINK</label>
                <input type="text" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3" />
              </div>
              {/* Increased width for description box */}
              <div className="col-span-2"> {/* Make it span across both columns */}
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm px-7 py-3"
                  style={{
                    minHeight: '120px', // Optional: Adjust the height for visual appeal
                    width: '100%' // Ensure the textarea spans the full width of the parent
                  }}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="bg-green-500 text-white px-12 py-3 rounded-md mt-6">
              Finish
            </button>
          </form>
        )}
      </div>
    </div>
      </div >
    </Layout >
  );
};

export default ForumForm;