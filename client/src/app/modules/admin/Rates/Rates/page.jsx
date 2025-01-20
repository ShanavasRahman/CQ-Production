import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosinstance';

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [newLead, setNewLead] = useState(initialData || {
    countryCode: '',
    country: '',
    qualityDescription: '',
    rate: '',
    status: 'na',
    testStatus: 'na',
    profile: '',
    testControl: 'na',
  });

  useEffect(() => {
    if (initialData) {
      setNewLead(initialData);
    } else {
      setNewLead({
        countryCode: '',
        country: '',
        qualityDescription: '',
        rate: '',
        status: 'na',
        testStatus: 'na',
        profile: '',
        testControl: 'na',
      });
    }
  }, [initialData]);

  const handleAddLead = (e) => {
    e.preventDefault();
    onSubmit(newLead);
    setNewLead({ 
      countryCode: '',
      country: '',
      qualityDescription: '',
      rate: '',
      status: 'na',
      testStatus: 'na',
      profile: '',
      testControl: 'na',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">{initialData ? 'Update Rate' : 'Add New Rate'}</h3>
        <form onSubmit={handleAddLead}>
          <input
            type="text"
            placeholder="Country Code"
            value={newLead.countryCode}
            onChange={(e) => setNewLead({ ...newLead, countryCode: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={newLead.country}
            onChange={(e) => setNewLead({ ...newLead, country: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Quality Description"
            value={newLead.qualityDescription}
            onChange={(e) => setNewLead({ ...newLead, qualityDescription: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Rate"
            value={newLead.rate}
            onChange={(e) => setNewLead({ ...newLead, rate: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Profile"
            value={newLead.profile}
            onChange={(e) => setNewLead({ ...newLead, profile: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {initialData ? 'Update Rate' : 'Add Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RatesPage = () => {
  const [rateData, setRateData] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('country');
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axiosInstance.get('v3/api/rates');
        setRateData(response.data);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };
    fetchRates();
  }, []);

  const filteredData = rateData.filter((rate) => {
    const country = rate.country || '';
    const profile = rate.profile || '';
    return (
      country.toLowerCase().includes(search.toLowerCase()) ||
      profile.toLowerCase().includes(search.toLowerCase())
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'country') {
      return a.country.localeCompare(b.country);
    } else if (sort === 'rate') {
      return a.rate - b.rate;
    }
    return 0;
  });

  const handleAddLead = async (leadData) => {
    try {
      let response;
      if (isUpdateMode) {
        response = await axiosInstance.put(`v3/api/rates/${currentRate._id}`, leadData);
      } else {
        response = await axiosInstance.post('v3/api/rates', leadData);
      }
      setRateData((prev) => 
        isUpdateMode 
          ? prev.map(rate => (rate._id === currentRate._id ? response.data : rate)) 
          : [...prev, response.data]
      );
      setSuccessMessage(isUpdateMode ? 'Rate updated successfully!' : 'Lead added successfully!');
      setErrorMessage('');
      setModalOpen(false);
      setIsUpdateMode(false);
      setCurrentRate(null);
    } catch (error) {
      console.error('Error adding/updating lead:', error);
      setErrorMessage('Failed to add/update lead. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleUpdateClick = (rate) => {
    setCurrentRate(rate);
    setIsUpdateMode(true);
    setModalOpen(true);
  };

  const handleDeleteClick = async (rateId) => {
    try {
      await axiosInstance.delete(`v3/api/rates/${rateId}`);
      setRateData((prev) => prev.filter(rate => rate._id !== rateId));
      setSuccessMessage('Rate deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting rate:', error);
      setErrorMessage('Failed to delete rate. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-900">
      <h2 className="text-xl font-bold">Rates</h2>
      <p className="text-gray-600 mt-2">Here you can view, filter, and sort rates.</p>

      <button
        onClick={() => {
          setModalOpen(true);
          setIsUpdateMode(false);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Add Rate
      </button>

      {successMessage && <div className="mt-4 text-green-600">{successMessage}</div>}
      {errorMessage && <div className="mt-4 text-red-600">{errorMessage}</div>}

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mr-2"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2">
          <option value="country">Sort by Country</option>
          <option value="rate">Sort by Rate</option>
        </select>
      </div>

      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Country Code</th>
            <th className="border border-gray-300 px-4 py-2">Country</th>
            <th className="border border-gray-300 px-4 py-2">Quality Description</th>
            <th className="border border-gray-300 px-4 py-2">Rate</th>
            <th className="border border-gray-300 px-4 py-2">Profile</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((rate) => (
            <tr key={rate._id}>
              <td className="border border-gray-300 px-4 py-2">{rate.countryCode}</td>
              <td className="border border-gray-300 px-4 py-2">{rate.country}</td>
              <td className="border border-gray-300 px-4 py-2">{rate.qualityDescription}</td>
              <td className="border border-gray-300 px-4 py-2">{rate.rate}</td>
              <td className="border border-gray-300 px-4 py-2">{rate.profile}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleUpdateClick(rate)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(rate._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsUpdateMode(false);
          setCurrentRate(null);
        }}
        onSubmit={handleAddLead}
        initialData={isUpdateMode ? currentRate : null}
      />
    </div>
  );
};

export default RatesPage;
