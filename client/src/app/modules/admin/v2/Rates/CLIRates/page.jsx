import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import Layout from '../../layout/page';
import axios from 'axios';
import adminContext from '../../../../../../context/page';

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [newLead, setNewLead] = useState(initialData || {
    countryCode: '',
    country: '',
    qualityDescription: '',
    rate: '',
    status: 'Inactive',
    billingCycle: '',
    rtp: '',
    asr: '',
    acd: '',
    ticker: false, 
    testStatus: 'na',
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
        status: 'Inactive',
        billingCycle: '',
        rtp: '',
        asr: '',
        acd: '',
        testStatus: 'na',
        ticker: false,
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
      status: 'Inactive',
      billingCycle: '',
      rtp: '',
      asr: '',
      acd: '',
      testStatus: 'na',
      ticker: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">{initialData ? 'Update Rate' : 'Add New Rate'}</h3>
        <form onSubmit={handleAddLead}>
          <input type="text" placeholder="Country Code" value={newLead.countryCode} onChange={(e) => setNewLead({ ...newLead, countryCode: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input type="text" placeholder="Country" value={newLead.country} onChange={(e) => setNewLead({ ...newLead, country: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input type="text" placeholder="Quality Description" value={newLead.qualityDescription} onChange={(e) => setNewLead({ ...newLead, qualityDescription: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input type="number" placeholder="Rate" value={newLead.rate} onChange={(e) => setNewLead({ ...newLead, rate: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" required />
          <input type="text" placeholder="Billing Cycle" value={newLead.billingCycle} onChange={(e) => setNewLead({ ...newLead, billingCycle: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="RTP" value={newLead.rtp} onChange={(e) => setNewLead({ ...newLead, rtp: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="ASR" value={newLead.asr} onChange={(e) => setNewLead({ ...newLead, asr: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <input type="text" placeholder="ACD" value={newLead.acd} onChange={(e) => setNewLead({ ...newLead, acd: e.target.value })} className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg" />
          <label className="flex items-center mb-4">
            <span className="mr-2">Status:</span>
            <select
              value={newLead.status}
              onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
              className="border border-gray-300 rounded-lg px-2 py-1"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={newLead.ticker} onChange={(e) => setNewLead({ ...newLead, ticker: e.target.checked })} className="form-checkbox h-5 w-5 text-blue-600" />
              <span className="ml-2">Add to Ticker</span>
            </label>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">{initialData ? 'Update Rate' : 'Add Rate'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RatesPage = () => {
  const {adminDetails} = useContext(adminContext)
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
        const response = await axios.get('https://backend.cloudqlobe.com/v3/api/clirates');
        setRateData(response.data);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };
    fetchRates();
  }, []);

  const filteredData = rateData.filter((rate) => {
    const country = rate.country || '';
    const qualityDescription = rate.qualityDescription || '';
    return country.toLowerCase().includes(search.toLowerCase()) || qualityDescription.toLowerCase().includes(search.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'country') return a.country.localeCompare(b.country);
    if (sort === 'rate') return a.rate - b.rate;
    return 0;
  });

  const handleAddLead = async (leadData) => {
    try {
      let response;
      if (isUpdateMode) {
        response = await axiosInstance.put(`v3/api/clirates/${currentRate._id}`, leadData);
      } else {
        response = await axiosInstance.post('v3/api/clirates', leadData);
        
        if (leadData.ticker) {
          await axiosInstance.post('/v3/api/clt', { rateids: [response.data._id] });
        }
      }
      setRateData((prev) => 
        isUpdateMode 
          ? prev.map(rate => (rate._id === currentRate._id ? response.data : rate)) 
          : [...prev, response.data]
      );
      setSuccessMessage(isUpdateMode ? 'Rate updated successfully!' : 'Rate added successfully!');
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
      await axiosInstance.delete(`v3/api/clirates/${rateId}`);
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
    <Layout>
      <div className="p-6 text-gray-900">
        <h2 className="text-xl font-bold">CLI Rates</h2>
        {successMessage && <div className="text-green-600">{successMessage}</div>}
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        
        <div className="flex items-center mb-4">
          <input type="text" placeholder="Search by country or quality description" value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 mr-2" />
          
          {['superAdmin', "account"].includes(adminDetails.role) && (
          <button onClick={() => { setIsUpdateMode(false); setModalOpen(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Rate</button>
          )}

          </div>
        <select onChange={(e) => setSort(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 mb-4">
          <option value="country">Sort by Country</option>
          <option value="rate">Sort by Rate</option>
        </select>

        <table className="min-w-full bg-white shadow-lg mt-4">
          <thead>
            <tr className="bg-[#005F73] text-white">
              <th className="px-4 py-2">Country Code</th>
              <th className="px-4 py-2">Country Name</th>
              <th className="px-4 py-2">Quality Description</th>
              <th className="px-4 py-2">Rate</th>
              <th className="px-4 py-2">Status</th>
              {['superAdmin', "account"].includes(adminDetails.role) && (
              <th className="px-4 py-2">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((rate, index) => (
              <tr key={rate._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="px-4 py-2">{rate.countryCode}</td>
                <td className="px-4 py-2">{rate.country}</td>
                <td className="px-4 py-2">{rate.qualityDescription}</td>
                <td className="px-4 py-2">{rate.rate}</td>
                <td className={`px-4 py-2 ${rate.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{rate.status}</td>
                {['superAdmin', "account"].includes(adminDetails.role) && (
                <td className="px-4 py-2">
                  <button onClick={() => handleUpdateClick(rate)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDeleteClick(rate._id)} className="text-red-500 hover:underline ml-2">Delete</button>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddLead} initialData={currentRate} />
      </div>
    </Layout>
  );
};

export default RatesPage;