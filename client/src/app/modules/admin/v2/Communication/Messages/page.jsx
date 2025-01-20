// export default InternalAssistance;
import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaReply, FaInbox, FaUserCircle, FaRegClock } from 'react-icons/fa';

const messagesData = [
  { id: 1, category: 'Sales', sender: 'John Doe', message: 'Can you provide the latest sales report?', time: '10:30 AM', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, category: 'Support', sender: 'Jane Smith', message: 'Having trouble with my account.', time: '09:15 AM', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 3, category: 'Leads', sender: 'Sam Wilson', message: 'Need more information on the leads process.', time: '08:45 AM', avatar: 'https://i.pravatar.cc/100?img=3' },
];

const CommunicationMessagesDashboard = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Messages Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <FaInbox className="mr-2 text-blue-500" />
                Inbox
              </h2>
              <ul>
                {messagesData.map((message) => (
                  <li
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 mb-4 bg-gray-50 hover:bg-blue-100 rounded-lg cursor-pointer flex items-start space-x-4 ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
                  >
                    <img src={message.avatar} alt={message.sender} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="font-medium text-gray-800">{message.sender}</h3>
                      <p className="text-sm text-gray-600">{`message.message.length > 50 ? ${message.message.substring(0, 50)}... : message.message`}</p>
                      <span className="text-xs text-gray-500 flex items-center">
                        <FaRegClock className="mr-1" /> {message.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Message Detail and Reply Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-2">
              {selectedMessage ? (
                <>
                  <div className="flex items-center mb-6">
                    <img src={selectedMessage.avatar} alt={selectedMessage.sender} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{selectedMessage.sender}</h2>
                      <p className="text-gray-500">{selectedMessage.category}</p>
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaRegClock className="mr-1" /> {selectedMessage.time}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <p className="text-gray-700">{selectedMessage.message}</p>
                  </div>

                  <textarea
                    rows="4"
                    placeholder={`Reply to ${selectedMessage.sender}...`}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center">
                    <FaReply className="mr-2" /> Send Reply
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <FaUserCircle className="text-gray-300 text-6xl mb-4" />
                  <p className="text-gray-500">Select a message to view details and reply.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunicationMessagesDashboard;