import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaComments, FaChartLine, FaDollarSign, FaHeadset, FaBriefcase } from 'react-icons/fa';
import { FaReact } from "react-icons/fa6";
import { SiGraphql } from "react-icons/si";

const categories = [
  { id: 1, name: 'Sales', icon: FaChartLine, description: 'Assistance with sales-related queries.' },
  { id: 2, name: 'Marketing', icon: SiGraphql, description: 'Get help with marketing generation or management.' },
  { id: 3, name: 'Accounts', icon: FaBriefcase, description: 'Support for account and billing issues.' },
  { id: 4, name: 'Support', icon: FaHeadset, description: 'Technical support and customer service.' },
  { id: 5, name: 'Carriers', icon: FaComments, description: 'Queries related to carriers and partnerships.' },
  { id: 6, name: 'Software Assistance', icon: FaReact, description: 'Queries related to software.' },
];

const CommunicationInternalAssistance = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Internal Assistance</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transform transition duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <category.icon className="text-blue-500 text-5xl" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-700">{category.name}</h2>
                    <p className="text-gray-500">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">Chat with {selectedCategory.name}</h2>
              <p className="text-gray-600 mt-2">
                {selectedCategory.description}
              </p>
              <div className="mt-4">
                {/* Chat Input or Raise Request Form */}
                <textarea
                  rows="4"
                  placeholder={`Type your message for ${selectedCategory.name}...`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationInternalAssistance;