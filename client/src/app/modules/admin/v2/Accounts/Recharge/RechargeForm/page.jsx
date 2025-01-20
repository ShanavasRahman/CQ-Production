import React, { useState } from 'react';
import { FaCalendarAlt, FaMoneyBillAlt, FaFileUpload, FaUserCircle } from 'react-icons/fa';
import Layout from '../../../layout/page'; // Import the Layout component

const RechargeForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentTime, setPaymentTime] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [accountAgent, setAccountAgent] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setScreenshot(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Recharge form submitted successfully!');
  };

  return (
    <Layout> {/* Wrap the content in the Layout component */}
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="flex w-full max-w-screen-xl bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Left Side Image Section */}
          <div className="w-full lg:w-1/2 bg-offwhite flex items-center justify-center">
            <img
              src="/images/Accountsrecharge.avif"
              alt="Side Image"
              className="w-3/4 h-auto object-cover mt-9" // Added top margin for spacing
            />
          </div>

          {/* Right Side Form Section */}
          <div className="w-full lg:w-1/2 p-10 bg-white">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
              <FaMoneyBillAlt className="mr-3 text-blue-500 text-4xl" /> Recharge Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Section */}
              <div className="flex items-center space-x-4">
                <FaMoneyBillAlt className="text-gray-600 text-2xl" />
                <input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Payment Time Section */}
              <div className="flex items-center space-x-4">
                <FaCalendarAlt className="text-gray-600 text-2xl" />
                <input
                  type="datetime-local"
                  value={paymentTime}
                  onChange={(e) => setPaymentTime(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Reference No Section */}
              <div className="flex items-center space-x-4">
                <FaFileUpload className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  placeholder="Enter Reference No"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Account Agent Section */}
              <div className="flex items-center space-x-4">
                <FaUserCircle className="text-gray-600 text-2xl" />
                <input
                  type="text"
                  placeholder="Enter Account Agent"
                  value={accountAgent}
                  onChange={(e) => setAccountAgent(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Screenshot Section */}
              <div className="flex items-center space-x-4">
                <FaFileUpload className="text-gray-600 text-2xl" />
                <div className="flex flex-col w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {screenshot && (
                    <div className="mt-4">
                      <img src={screenshot} alt="Screenshot Preview" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RechargeForm;