import React, { useState, useEffect } from "react"; 
import { FaRegEye, FaCheckCircle } from "react-icons/fa"; 
import DashboardLayout from "../../layout/page"; 

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("total");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    // Dummy data for tasks
    const fetchedTasks = [
      { id: 1, taskNo: "T001", accountManager: "John Doe", task: "Task 1", supportEngineer: "Emma", status: "Completed", priority: "High" },
      { id: 2, taskNo: "T002", accountManager: "Jane Smith", task: "Task 2", supportEngineer: "Lucas", status: "Pending", priority: "Medium" },
      { id: 3, taskNo: "T003", accountManager: "Alice Brown", task: "Task 3", supportEngineer: "Sophia", status: "In Progress", priority: "Low" },
      { id: 4, taskNo: "T004", accountManager: "Michael Clark", task: "Task 4", supportEngineer: "Liam", status: "Completed", priority: "High" },
      { id: 5, taskNo: "T005", accountManager: "Sarah Lee", task: "Task 5", supportEngineer: "Olivia", status: "Pending", priority: "Medium" },
    ];

    setTasks(fetchedTasks);
  }, []);

  const applyFilters = () => {
    let filtered = tasks;

    if (activeTab === "completed") {
      filtered = filtered.filter((task) => task.status === "Completed");
    } else if (activeTab === "pending") {
      filtered = filtered.filter((task) => task.status === "Pending");
    }

    if (filterStatus) {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [activeTab, filterStatus]);

  const getTaskCount = (status) => {
    if (status === "total") return tasks.length;
    return tasks.filter((task) => task.status === status).length;
  };

  const openTaskDetails = (taskId) => {
    alert(`Viewing task details for Task ${taskId}`);
  };

  const handlePickup = (taskId) => {
    alert(`Picking up task ${taskId}`);
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 text-gray-800">
        <h2 className="text-3xl text-gray-500 font-default mb-6">Task Management</h2>

        {/* Tabs Section with spacing */}
        <div className="flex space-x-4 mb-6">
          {["total", "completed", "pending"].map((status) => (
            <div
              key={status}
              className={`flex-1 bg-gradient-to-r ${
                status === "total"
                  ? "from-blue-400 to-blue-600"
                  : status === "completed"
                  ? "from-green-400 to-green-600"
                  : "from-yellow-400 to-yellow-600"
              } text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
              onClick={() => setActiveTab(status)}
            >
              <h3 className="text-lg font-semibold">
                {status === "total"
                  ? "All Tasks"
                  : status === "completed"
                  ? "Completed"
                  : "Pending"}
              </h3>
              <p className="text-4xl font-bold mt-2">{getTaskCount(status)}</p>
            </div>
          ))}
        </div>

        {/* Filter Section aligned on the same line */}
        <div className="flex items-center justify-end mb-6 bg-white p-4 rounded-lg shadow-md space-x-4">
          <select
            className="p-2 bg-white border rounded shadow"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={applyFilters}
          >
            Filter
          </button>
        </div>

        {/* Task Table */}
        <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-[#005F73] text-white">
              <tr>
                <th className="py-2 px-4">Task No</th>
                <th className="py-2 px-4">Account Manager</th>
                <th className="py-2 px-4">Task</th>
                <th className="py-2 px-4">Support Engineer</th>
                <th className="py-2 px-4 text-center">Status</th>
                <th className="py-2 px-4">Priority</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="bg-white border-b">
                  <td className="py-2 px-4">{task.taskNo}</td>
                  <td className="py-2 px-4">{task.accountManager}</td>
                  <td className="py-2 px-4">{task.task}</td>
                  <td className="py-2 px-4">{task.supportEngineer}</td>
                  <td className="py-2 px-4 text-center">{task.status}</td>
                  <td className="py-2 px-4">{task.priority}</td>
                  <td className="py-2 px-4 text-right">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
                      onClick={() => openTaskDetails(task.id)}
                    >
                      <FaRegEye className="inline-block mr-2" />
                      View
                    </button>
                    <button
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                      onClick={() => handlePickup(task.id)}
                    >
                      <FaCheckCircle className="inline-block mr-2" />
                      Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskPage;