import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons
import { GrSupport } from "react-icons/gr";

const SupportTab = ({ customerId }) => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all", "pending", "inProgress", "resolved"
  
  // Dummy data for support requests
  const dummyData = [
    {
      id: 1,
      customerId: "C001",
      accountManager: "Manager1",
      issues: "Login issue",
      supportEngineer: "Engineer1",
      estimatedTime: "2 hours",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 2,
      customerId: "C002",
      accountManager: "Manager2",
      issues: "Payment failure",
      supportEngineer: "Engineer2",
      estimatedTime: "1 hour",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      customerId: "C003",
      accountManager: "Manager3",
      issues: "Feature request",
      supportEngineer: "Engineer3",
      estimatedTime: "3 hours",
      status: "Resolved",
      priority: "Low",
    },
    {
      id: 4,
      customerId: "C004",
      accountManager: "Manager4",
      issues: "Bug report",
      supportEngineer: "Engineer4",
      estimatedTime: "4 hours",
      status: "Pending",
      priority: "High",
    }
  ];

  useEffect(() => {
    // Simulate fetching data
    setSupportRequests(dummyData);
    setFilteredRequests(dummyData);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filter based on status
    if (filter === "all") {
      setFilteredRequests(supportRequests);
    } else {
      setFilteredRequests(supportRequests.filter(request => request.status.toLowerCase() === filter));
    }
  }, [filter, supportRequests]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <GrSupport className="mr-3 text-5xl text-yellow-500" /> Support Requests
      </h2>

      {/* Filter buttons */}
      <div className="flex mb-4">
        <button
          className={`py-2 px-4 mr-2 rounded ${filter === "all" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          All Tickets
        </button>
        <button
          className={`py-2 px-4 mr-2 rounded ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`py-2 px-4 mr-2 rounded ${filter === "inprogress" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("inprogress")}
        >
          In Progress
        </button>
        <button
          className={`py-2 px-4 rounded ${filter === "resolved" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("resolved")}
        >
          Resolved
        </button>
      </div>

      {/* Support Requests Table */}
      <table className="min-w-full border-collapse">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2">Customer ID</th>
            <th className="px-4 py-2">Account Manager</th>
            <th className="px-4 py-2">Issues</th>
            <th className="px-4 py-2">Support Engineer</th>
            <th className="px-4 py-2">Estimated Time</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr
              key={request.id}
              className={`hover:bg-blue-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="px-4 py-2">{request.customerId}</td>
              <td className="px-4 py-2">{request.accountManager}</td>
              <td className="px-4 py-2">{request.issues}</td>
              <td className="px-4 py-2">{request.supportEngineer}</td>
              <td className="px-4 py-2">{request.estimatedTime}</td>
              <td className="px-4 py-2">{request.priority}</td>
              <td className="px-4 py-2 flex items-center">
                {request.status === "Resolved" ? (
                  <FaCheckCircle className="text-green-500 mr-2" />
                ) : request.status === "Pending" ? (
                  <FaTimesCircle className="text-yellow-500 mr-2" />
                ) : (
                  <FaTimesCircle className="text-orange-500 mr-2" />
                )}
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportTab;