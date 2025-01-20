import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BiSolidBadgeDollar } from "react-icons/bi";

const PaymentsTab = ({ customerId }) => {
  const [payments, setPayments] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [activeTab, setActiveTab] = useState("payments"); // payments, refunds

  // Dummy Data for Payments
  useEffect(() => {
    const dummyPayments = [
      { id: 1, amount: "$200", type: "Online", time: "2025-01-09 14:00", mode: "Credit Card", user: "John Doe", refNo: "ABC123", agent: "Agent1", status: "Completed" },
      { id: 2, amount: "$150", type: "Cash", time: "2025-01-08 10:30", mode: "Cash", user: "Jane Doe", refNo: "XYZ789", agent: "Agent2", status: "Pending" },
      { id: 3, amount: "$300", type: "Bank Transfer", time: "2025-01-07 09:45", mode: "Bank", user: "John Smith", refNo: "LMN456", agent: "Agent3", status: "Completed" },
    ];
    setPayments(dummyPayments);
    setLoading(false);
  }, []);

  // Dummy Data for Refunds (Added reason field)
  useEffect(() => {
    const dummyRefunds = [
      { id: 1, amount: "$100", type: "Online", time: "2025-01-09 15:00", mode: "Credit Card", user: "John Doe", refNo: "DEF123", agent: "Agent1", reason: "spam", status: "Completed" },
      { id: 2, amount: "$50", type: "Bank Transfer", time: "2025-01-08 11:00", mode: "Bank", user: "Jane Doe", refNo: "UVW456", agent: "Agent2", reason: "fake customer", status: "Pending" },
      { id: 3, amount: "$200", type: "Cash", time: "2025-01-07 10:00", mode: "Cash", user: "John Smith", refNo: "XYZ789", agent: "Agent3", reason: "Overcharged", status: "Completed" },
    ];
    setRefunds(dummyRefunds);
  }, []);

  const filteredPayments = payments.filter(payment => filter === "all" || payment.status === filter);
  const filteredRefunds = refunds.filter(refund => filter === "all" || refund.status === filter);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <BiSolidBadgeDollar className="mr-3 text-6xl text-yellow-500" />
        Payments Information
      </h2>

      {/* Filter & Tab buttons container */}
      <div className="flex justify-between mb-4">
        {/* Filter buttons */}
        <div className="flex">
          <button
            className={`py-2 px-4 mr-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`py-2 px-4 mr-2 rounded ${filter === "Completed" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
          <button
            className={`py-2 px-4 rounded ${filter === "Pending" ? "bg-red-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>
        </div>

        {/* Tab buttons */}
        <div>
          <button
            className={`py-2 px-4 mr-2 rounded ${activeTab === "payments" ? "bg-green-500 text-white" : "bg-green-500"}`}
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "refunds" ? "bg-red-500 text-white" : "bg-red-500"}`}
            onClick={() => setActiveTab("refunds")}
          >
            Refunds
          </button>
        </div>
      </div>

      {/* Payments Table */}
      {activeTab === "payments" && (
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-yellow-400">
            <tr>
              <th className="px-4 py-2 text-left">Customer ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Payment Time</th>
              <th className="px-4 py-2 text-left">Reference No</th>
              <th className="px-4 py-2 text-left">Account Agent</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr key={payment.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                <td className="px-4 py-2">{payment.id}</td>
                <td className="px-4 py-2">{payment.amount}</td>
                <td className="px-4 py-2">{payment.time}</td>
                <td className="px-4 py-2">{payment.refNo}</td>
                <td className="px-4 py-2">{payment.agent}</td>
                <td className="px-4 py-2 flex items-center">
                  {payment.status === "Completed" ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Refunds Table */}
      {activeTab === "refunds" && (
        <table className="min-w-full bg-white mt-6 border-collapse">
          <thead className="bg-blue-400">
            <tr>
              <th className="px-4 py-2 text-left">Customer ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Payment Time</th>
              <th className="px-4 py-2 text-left">Reference No</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRefunds.map((refund, index) => (
              <tr key={refund.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                <td className="px-4 py-2">{refund.id}</td>
                <td className="px-4 py-2">{refund.amount}</td>
                <td className="px-4 py-2">{refund.time}</td>
                <td className="px-4 py-2">{refund.refNo}</td>
                <td className="px-4 py-2">{refund.reason}</td>
                <td className="px-4 py-2 flex items-center">
                  {refund.status === "Completed" ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  {refund.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentsTab;