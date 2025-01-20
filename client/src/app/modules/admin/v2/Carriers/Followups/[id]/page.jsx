import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from '../../../layout/page';
import axiosInstance from '../../../utils/axiosinstance';
import { Calendar, Phone, Mail, MessageSquare } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FollowUpDetails = () => {
  const { followUpId } = useParams() // Use React Router for route params
  const [followUp, setFollowUp] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [nextFollowUpType, setNextFollowUpType] = useState('call');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = followUpId
  useEffect(() => {
    const fetchFollowUp = async () => {
      try {
        const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/followups/${id}`);
        setFollowUp(response.data);
        setStatus(response.data.followupStatus);

        const customerResponse = await axios.get(
          `https://backend.cloudqlobe.com/v3/api/customers/${response.data.customerId}`
        );
        setCustomer(customerResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUp();
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!followUp) return;

    const updatedFollowUpData = {
      ...followUp,
      followupStatus: status,
      followupHistory: [
        ...(followUp.followupHistory || []),
        `${status} -**- ${note} -**- ${new Date(
          followUp.followupTime
        ).toLocaleString()}`,
      ],
      followupTime: nextFollowUpDate.toISOString(),
    };

    try {
      await axios.put(`https://backend.cloudqlobe.com/v3/api/followups/${id}`, updatedFollowUpData);
      setFollowUp(updatedFollowUpData);
      alert('Follow-up updated successfully!');
      setShowDialog(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderFollowUpHistory = () => {
    return followUp.followupHistory.map((entry, index) => {
      const [entryStatus, entryDescription, entryTime] = entry.split(' -**- ');

      return (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md mb-2 border-l-4 border-blue-500"
        >
          <p>
            <span className="font-semibold text-black-600">Status:</span>{' '}
            <span className="font-normal text-gray-700">{entryStatus}</span>
          </p>
          <p>
            <span className="font-semibold text-black-600">Description:</span>{' '}
            <span className="font-normal text-gray-700">
              {entryDescription || 'N/A'}
            </span>
          </p>
          <p>
            <span className="font-semibold text-black-600">Time:</span>{' '}
            <span className="font-normal text-gray-700">
              {new Date(entryTime).toLocaleString()}
            </span>
          </p>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-blue-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Error fetching data: {error}
      </div>
    );
  }

  if (!followUp) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Follow-up not found.
      </div>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-br from-black-50 to-orange-50 min-h-screen p-8">
        <h2 className="text-3xl font-bold mb-6 text-black-800">
          Follow-Up Details
        </h2>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200 mb-6">
          <h3 className="font-semibold text-xl mb-4 text-black-700">
            Follow-Up Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <span className="font-semibold text-black-600">
                Follow-Up ID:
              </span>{' '}
              {followUp.followupId}
            </p>
            <p>
              <span className="font-semibold text-black-600">
                Customer ID:
              </span>{' '}
              {followUp.customerId}
            </p>
            <p>
              <span className="font-semibold text-black-600">
                Description:
              </span>{' '}
              {followUp.followupDescription.join(', ')}
            </p>
            <p>
              <span className="font-semibold text-black-600">
                Follow-Up Date:
              </span>{' '}
              {new Date(followUp.followupTime).toLocaleString()}
            </p>
          </div>
          <div className="mt-4">
            <span className="font-semibold text-black-600">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="ml-2 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={() => setShowDialog(true)}
              className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
            >
              Update Status
            </button>
          </div>
        </div>

        {customer && (
          <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200 mb-6">
            <h3 className="font-semibold text-xl mb-4 text-black-700">
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-semibold text-black-600">
                  Company Name:
                </span>{' '}
                {customer.companyName}
              </p>
              <p>
                <span className="font-semibold text-black-600">
                  Customer Type:
                </span>{' '}
                {customer.customerType}
              </p>
              <p>
                <span className="font-semibold text-black-600">Email:</span>{' '}
                {customer.companyEmail}
              </p>
              <p>
                <span className="font-semibold text-black-600">
                  Contact Person:
                </span>{' '}
                {customer.contactPerson}
              </p>
            </div>
          </div>
        )}

        {followUp.followupHistory && followUp.followupHistory.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200 mb-6">
            <h3 className="font-semibold text-xl mb-4 text-black-700">
              Follow-Up History
            </h3>
            {renderFollowUpHistory()}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FollowUpDetails;