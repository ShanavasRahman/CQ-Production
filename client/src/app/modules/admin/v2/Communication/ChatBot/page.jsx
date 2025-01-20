import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaReply, FaUserCircle, FaCircle, FaPlus, FaEllipsisV } from 'react-icons/fa';

const contacts = [
  { id: 1, name: 'John Doe', message: 'Can you provide the latest report?', time: '10:30 AM', avatar: 'https://i.pravatar.cc/100?img=1', online: true },
  { id: 2, name: 'Jane Smith', message: 'Having trouble with my account.', time: '09:15 AM', avatar: 'https://i.pravatar.cc/100?img=2', online: false },
  { id: 3, name: 'Sam Wilson', message: 'Need more information on the leads process.', time: '08:45 AM', avatar: 'https://i.pravatar.cc/100?img=3', online: true },
];

const ChatPanel = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Chat Panel</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contacts List */}
            <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                Contacts
                <FaPlus className="ml-2 text-blue-500 cursor-pointer" title="Add Contact" />
              </h2>
              <ul>
                {contacts.map((contact) => (
                  <li
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 mb-4 bg-gray-50 hover:bg-blue-100 rounded-lg cursor-pointer flex items-center space-x-4 ${selectedContact?.id === contact.id ? 'bg-blue-100' : ''}`}
                  >
                    <div className="relative">
                      <img src={contact.avatar} alt={contact.name} className="w-16 h-16 rounded-full" />
                      <FaCircle className={`absolute bottom-0 right-0 text-sm ${contact.online ? 'text-green-500' : 'text-gray-400'}`} />
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
            <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-2 flex flex-col h-[500px]">
              {selectedContact ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <img src={selectedContact.avatar} alt={selectedContact.name} className="w-20 h-20 rounded-full mr-4" />
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                          {selectedContact.name}
                          <FaCircle className={`ml-2 ${selectedContact.online ? 'text-green-500' : 'text-gray-400'}`} />
                        </h2>
                        <p className="text-gray-500">{selectedContact.online ? 'Online' : 'Offline'}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <FaEllipsisV className="text-gray-500 cursor-pointer" onClick={toggleMenu} />
                      {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                          <ul className="text-sm text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Archive</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Pin to Bar</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 p-4 rounded-lg mb-4 overflow-y-auto">
                    {/* Chat bubbles */}
                    <div className="mb-2">
                      <div className="bg-blue-100 p-3 rounded-lg w-3/4">
                        <p>Hello! How can I help you?</p>
                      </div>
                      <span className="text-xs text-gray-500">10:30 AM</span>
                    </div>
                    <div className="mb-2 text-right">
                      <div className="bg-green-100 p-3 rounded-lg w-3/4 ml-auto">
                        <p>I need the latest sales report.</p>
                      </div>
                      <span className="text-xs text-gray-500">10:32 AM</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <textarea
                      rows="2"
                      placeholder={`Message ${selectedContact.name}...`}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center">
                      <FaReply className="mr-2" /> Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center flex-1 flex items-center justify-center">
                  <FaUserCircle className="text-gray-300 text-6xl mb-4" />
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

export default ChatPanel;