import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import "../Dashboard/dashboard.css";
import Layout from '../layout/page';
import {
    ChartBarSquareIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    LifebuoyIcon,
    EnvelopeIcon,
    Cog6ToothIcon,
    UserIcon,
    Squares2X2Icon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
  } from "@heroicons/react/24/outline";
  


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);



const AdminHomePage = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Leads",
        data: [30, 45, 65, 50, 70, 90],
        backgroundColor: "#34D399", // A fresh, pleasant green color
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };


  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Rates",
        data: [10, 15, 20, 15, 25, 30],
        borderColor: "#ef4444",
        fill: false,
      },
    ],
  };

  return (
    <Layout>
      <main className="flex-grow p-10 bg-offwhite-100 mt-0">
        <div className="max-w-7xl mx-auto h-[800px]">
          {/* Dashboard Header */}
          <h2 className="text-2xl font-bold mb-12 flex items-center space-x-3">
            <Squares2X2Icon className="w-10 h-10 text-blue-600" />
            <span>DASHBOARD OVERVIEW</span>
          </h2>

          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 mt-4">
            {/* Rate Increase */}
            <div className="card bg-gray-300 p-4 rounded-lg flex items-center justify-between hover:bg-gray-400 transition-colors duration-200">
              <div className="bg-white p-3 rounded-full shadow-none">
                <ArrowTrendingUpIcon className="w-12 h-12 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Rate Increase</h3>
                <p className="text-xl text-green-600 font-bold">20%</p>
                <span className="text-sm text-gray-500">From last month</span>
              </div>
            </div>

            {/* Rate Decrease */}
            <div className="card bg-gray-300 p-4 rounded-lg flex items-center justify-between hover:bg-gray-400 transition-colors duration-200">
              <div className="bg-white p-3 rounded-full shadow-none">
                <ArrowTrendingDownIcon className="w-12 h-12 text-red-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Rate Decrease</h3>
                <p className="text-xl text-red-600 font-bold">15%</p>
                <span className="text-sm text-gray-500">From last month</span>
              </div>
            </div>

{/* Customer Conversion */}
            <div className="card bg-gray-300 p-4 rounded-lg flex items-center justify-between hover:bg-gray-400 transition-colors duration-200">
              <div className="bg-white p-3 rounded-full shadow-none">
                <UserGroupIcon className="w-12 h-12 text-purple-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Customer Conversion</h3>
                <p className="text-xl text-purple-600 font-bold">75%</p>
                <span className="text-sm text-gray-500">Of total leads</span>
              </div>
            </div>
              {/* Lead Generation */}
      <div className="card bg-gray-300 p-4 rounded-lg flex items-center justify-between hover:bg-gray-400 transition-colors duration-200">
        <div className="bg-white p-3 rounded-full shadow-none"> {/* Removed box-shadow */}
          <ClipboardDocumentListIcon className="w-12 h-12 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Lead Generation</h3>
          <p className="text-xl text-orange-600 font-bold">150</p>
          <span className="text-sm text-gray-500">New Leads This Month</span>
        </div>
      </div>

      {/* Business Conversion */}
      <div className="card bg-gray-300 p-4 rounded-lg flex items-center justify-between hover:bg-gray-400 transition-colors duration-200">
        <div className="bg-white p-3 rounded-full shadow-none"> {/* Removed box-shadow */}
          <ChartBarSquareIcon className="w-12 h-12 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Business Conversion</h3>
          <p className="text-xl text-blue-600 font-bold">75%</p>
          <span className="text-sm text-gray-500">Conversion Rate</span>
        </div>
      </div>

      {/* Support Tickets */}
      <div className="card bg-gray-300 p-4 rounded-lg flex items-center justify-between hover:bg-gray-400 transition-colors duration-200">
        <div className="bg-white p-3 rounded-full shadow-none"> {/* Removed box-shadow */}
          <LifebuoyIcon className="w-12 h-12 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Support Tickets</h3>
          <p className="text-xl text-purple-600 font-bold">35</p>
          <span className="text-sm text-gray-500">Open Tickets</span>
        </div>
      </div>
          </div>
            


          {/* Chart Section */}
          <div className="bg-white rounded-lg p-6 mt-8">
            <h3 className="text-2xl font-bold text-gray-700 flex items-center space-x-3 mb-12">
              <ChartBarIcon className="w-11 h-11 text-blue-600" />
              <span>CHART ANALYSIS</span>
            </h3>

            {/* Charts Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-x-5">
              {/* Bar Chart */}
              <div className="chart-card bg-white p-6 rounded-lg shadow-none h-[400px] w-full">
                <h4 className="text-lg font-semibold mb-4 text-gray-600">Lead Generation Over Time</h4>
                <Bar data={barData} options={chartOptions} />
              </div>

              {/* Line Chart */}
              <div className="chart-card bg-white p-6 rounded-lg shadow-none h-[400px] w-full">
                <h4 className="text-lg font-semibold mb-4 text-gray-600">Rate Analysis Over Time</h4>
                <Line data={lineData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AdminHomePage;