import React, { useState } from 'react';
import Layout from '../../layout/page';

import { FaReply, FaUserCircle, FaCircle, FaPlus, FaEllipsisV } from 'react-icons/fa';
import { MdMessage } from "react-icons/md";
const contacts = [
  { id: 1, name: 'John Doe', message: 'Can you provide the latest report?', time: '10:30 AM', avatar: 'https://i.pravatar.cc/100?img=1', online: true },
  { id: 2, name: 'Jane Smith', message: 'Having trouble with my account.', time: '09:15 AM', avatar: 'https://i.pravatar.cc/100?img=2', online: false },
  { id: 3, name: 'Sam Wilson', message: 'Need more information on the leads process.', time: '08:45 AM', avatar: 'https://i.pravatar.cc/100?img=3', online: true },
];

const AccountsMessage = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const liveUsersCount = contacts.filter(contact => contact.online).length;
  const pendingMessagesCount = contacts.filter(contact => !contact.online).length;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-3">
        <h1 className="text-4xl font-default text-gray-600 mb-3 text-center flex items-center justify-center">
    <MdMessage  className="mr-2 text-blue-500" /> {/* Chat icon */}
    Message Box
  </h1>
          {/* Profile Section */}
          <div className="flex items-center justify-between bg-white shadow-2xl p-3 mb-4">
            <div className="flex items-center">
              <img src="https://i.pravatar.cc/100?img=4" alt="User" className="w-14 h-14 rounded-full shadow-lg mr-3" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Alex Johnson</h2>
                <p className="text-gray-500">Support Agent</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-3 shadow-lg transform transition-transform hover:scale-105">
                Live Users ({liveUsersCount})
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-orange-500 text-white py-2 px-3 shadow-lg transform transition-transform hover:scale-105">
                Messages ({pendingMessagesCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Contacts List */}
            <div className="bg-white shadow-2xl p-4 lg:col-span-1">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center">
                Chats
                <FaPlus className="ml-2 text-blue-500 cursor-pointer hover:text-blue-600 transition" title="Add Contact" />
              </h2>
              <ul>
                {contacts.map((contact) => (
                  <li
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-3 mb-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-100 hover:to-blue-200 shadow-md cursor-pointer flex items-center space-x-3 transform transition-transform hover:scale-105 ${selectedContact?.id === contact.id ? 'from-blue-100 to-blue-200' : ''}`}
                  >
                    <div className="relative">
                      <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full shadow-inner" />
                      <FaCircle className={`absolute bottom-0 right-0 text-lg ${contact.online ? 'text-green-500' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.message}</p>
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chat Section */}
            <div className="bg-white shadow-2xl p-4 lg:col-span-2 flex flex-col h-[600px]">
              {selectedContact ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img src={selectedContact.avatar} alt={selectedContact.name} className="w-16 h-16 rounded-full shadow-inner mr-3" />
                      <div>
                        <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
                          {selectedContact.name}
                          <FaCircle className={`ml-2 ${selectedContact.online ? 'text-green-500' : 'text-gray-400'}`} />
                        </h2>
                        <p className="text-gray-500">{selectedContact.online ? 'Online' : 'Offline'}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <FaEllipsisV className="text-gray-500 cursor-pointer hover:text-gray-700 transition" onClick={toggleMenu} />
                      {menuOpen && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                          <ul className="text-sm text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Archive</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Pin to Bar</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-2xl mb-2 overflow-y-auto shadow-inner">
                    <div className="mb-2">
                      <div className="bg-blue-100 p-3 rounded-2xl shadow-md w-3/4">
                        <p>Hello! How can I help you?</p>
                      </div>
                      <span className="text-xs text-gray-500">10:30 AM</span>
                    </div>
                    <div className="mb-2 text-right">
                      <div className="bg-green-100 p-3 rounded-2xl shadow-md w-3/4 ml-auto">
                        <p>I need the latest sales report.</p>
                      </div>
                      <span className="text-xs text-gray-500">10:32 AM</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <textarea
                      rows="2"
                      placeholder={`Message ${selectedContact.name}...`}
                      className="flex-1 p-3 border border-gray-300 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-3 shadow-lg transform transition-transform hover:scale-105 flex items-center">
                      <FaReply className="mr-1" /> Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center flex-1 flex items-center justify-center">
                  <FaUserCircle className="text-gray-300 text-8xl mb-3" />
                  <p className="text-gray-500">Select a contact to start chatting.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountsMessage;