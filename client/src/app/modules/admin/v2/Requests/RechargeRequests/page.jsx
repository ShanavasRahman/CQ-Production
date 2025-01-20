import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaPlusCircle, FaFilter, FaUser, FaDollarSign, FaRegClock, FaFileInvoice, FaUserTie } from 'react-icons/fa';
import { RiApps2Line } from "react-icons/ri";
import { MdAddModerator } from "react-icons/md";

const RechargerequestPage = () => {
  const [payments, setPayments] = useState([
    { id: 1, customerId: 'C001', amount: 50, paymentTime: '2025-01-01', referenceNo: 'R001', accountAgent: 'Agent 1', status: 'Pending' },
    { id: 2, customerId: 'C002', amount: 30, paymentTime: '2025-01-02', referenceNo: 'R002', accountAgent: 'Agent 2', status: 'Completed' },
    { id: 3, customerId: 'C003', amount: 20, paymentTime: '2025-01-03', referenceNo: 'R003', accountAgent: 'Agent 3', status: 'Process' },
  ]);

  const [filter, setFilter] = useState('All');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [newPayment, setNewPayment] = useState({ customerId: '', amount: '', paymentTime: '', referenceNo: '', accountAgent: '', status: 'Pending' });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const handleAddPaymentClick = () => {
    setShowAddPaymentModal(true);
  };

  const handlePickupClick = (payment) => {
    setSelectedPayment(payment);
    setNewStatus(payment.status);
    setShowPickupModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleAddPayment = () => {
    setPayments([...payments, { ...newPayment, id: payments.length + 1 }]);
    setShowAddPaymentModal(false);
  };

  const handleUpdateStatus = () => {
    setPayments(prevPayments =>
      prevPayments.map(payment =>
        payment.id === selectedPayment.id ? { ...payment, status: newStatus } : payment
      )
    );
    setShowPickupModal(false);
  };

  const handleCancel = () => {
    setShowAddPaymentModal(false);
    setShowPickupModal(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterApply = () => {
    setPayments(prevPayments => {
      return prevPayments.filter(payment => filter === 'All' || payment.status === filter);
    });
  };

  return (
    <Layout>
      <div className="p-6 text-gray-600">
        <h2 className="text-3xl font-semibold flex items-center mb-4">
          <RiApps2Line className="mr-2 text-yellow-500 text-5xl" />
           Recharge Requests
        </h2>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleAddPaymentClick}
            className="px-4 py-2 bg-green-500 text-white flex items-center rounded-md"
          >
            <FaPlusCircle className="mr-2" />
            Add Payment
          </button>
          <div className="flex items-center">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="p-2 border rounded-md bg-white mr-2"
            >
              <option value="All">All</option>
              <option value="Process">Process</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={handleFilterApply}
              className="px-4 py-2 bg-orange-500 text-white flex items-center rounded-md"
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <table className="min-w-full border-collapse mb-6">
          <thead className="bg-[#005F73] text-white">
            <tr>
              <th className="p-2">Customer ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Payment Time</th>
              <th className="p-2">Reference No</th>
              <th className="p-2">Account Agent</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="bg-gray-100">
                <td className="p-2">{payment.customerId}</td>
                <td className="p-2">${payment.amount}</td>
                <td className="p-2">{payment.paymentTime}</td>
                <td className="p-2">{payment.referenceNo}</td>
                <td className="p-2">{payment.accountAgent}</td>
                <td className="p-2">{payment.status}</td>
                <td className="p-2 text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handlePickupClick(payment)}
                      className="px-4 py-2 w-36 bg-blue-500 text-white flex items-center justify-center rounded-md"
                    >
                      <FaPlusCircle className="mr-2" />
                      Pickup
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Payment Modal */}
        {showAddPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 w-1/3">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
  <MdAddModerator className="mr-2 text-yellow-500" />

  Add Payment
</h3>
              {[
                { name: 'customerId', icon: <FaUser className="mr-2" />, label: 'Customer ID' },
                { name: 'amount', icon: <FaDollarSign className="mr-2" />, label: 'Amount' },
                { name: 'paymentTime', icon: <FaRegClock className="mr-2" />, label: 'Payment Time' },
                { name: 'referenceNo', icon: <FaFileInvoice className="mr-2" />, label: 'Reference No' },
                { name: 'accountAgent', icon: <FaUserTie className="mr-2" />, label: 'Account Agent' },
              ].map((field, index) => (
                <div className="mb-4" key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  <div className="flex items-center">
                    {field.icon}
                    <input
                      name={field.name}
                      value={newPayment[field.name]}
                      onChange={handleInputChange}
                      className="p-2 border rounded-md w-full"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPayment}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Add Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pickup Modal */}
        {showPickupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 w-1/3">
              <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Change Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Process">Process</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RechargerequestPage;