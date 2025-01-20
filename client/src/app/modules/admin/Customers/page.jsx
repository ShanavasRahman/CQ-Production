import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('customerId');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('leadDetails'); // Active Tab

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://backend.cloudqlobe.com/v3/api/customers');
        const filteredCustomers = response.data.filter(
          (customer) => customer.customerType === 'Customer'
        );
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleSort = (field) => setSort(field);

  const handleSearch = (event) => setSearch(event.target.value);

  const handleRowClick = (customerId) => {
    window.location.href = `/modules/admin/Leads/${customerId}`;
  };

  const handleAddLead = () => {
    window.location.href = '/modules/admin/Leads/AddLead';
  };

  const filteredAndSortedCustomers = customers
    .filter((customer) =>
      Object.values(customer).some((value) =>
        Array.isArray(value)
          ? value.join(', ').toLowerCase().includes(search.toLowerCase())
          : value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sort] || '';
      const bValue = b[sort] || '';
      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue);
      } else if (Array.isArray(aValue)) {
        return aValue.join(', ').localeCompare(bValue.join(', '));
      }
      return 0;
    });

  return (
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Customer Management</h1>
      <p className="text-gray-600 mb-6">Manage your Customers here.</p>

      {/* Add Lead Button */}
      <button
        onClick={handleAddLead}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Add Lead
      </button>

      {/* Tab Navigation */}
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('leadDetails')}
          className={`px-4 py-2 ${
            activeTab === 'leadDetails' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
          } rounded-t-lg`}
        >
          Lead Details
        </button>
        <button
          onClick={() => setActiveTab('followUp')}
          className={`px-4 py-2 ${
            activeTab === 'followUp' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
          } rounded-t-lg`}
        >
          Follow-Up
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'leadDetails' && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by any parameter..."
              className="w-full bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th
                      className="py-3 px-4 text-left cursor-pointer"
                      onClick={() => handleSort('customerId')}
                    >
                      Customer ID
                    </th>
                    <th
                      className="py-3 px-4 text-left cursor-pointer"
                      onClick={() => handleSort('companyName')}
                    >
                      Company Name
                    </th>
                    <th
                      className="py-3 px-4 text-left cursor-pointer"
                      onClick={() => handleSort('contactPerson')}
                    >
                      Contact Person
                    </th>
                    <th
                      className="py-3 px-4 text-left cursor-pointer"
                      onClick={() => handleSort('country')}
                    >
                      Country
                    </th>
                    <th
                      className="py-3 px-4 text-left cursor-pointer"
                      onClick={() => handleSort('leadStatus')}
                    >
                      Lead Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedCustomers.map((customer, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(customer.customerId)}
                    >
                      <td className="py-3 px-4 text-gray-800">{customer.customerId}</td>
                      <td className="py-3 px-4 text-gray-800">{customer.companyName}</td>
                      <td className="py-3 px-4 text-gray-800">{customer.contactPerson}</td>
                      <td className="py-3 px-4 text-gray-800">{customer.country}</td>
                      <td className="py-3 px-4 text-gray-800">{customer.leadStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'followUp' && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Follow-Up Actions</h2>
          <p className="text-gray-600">Here you can manage follow-up actions related to your leads.</p>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
