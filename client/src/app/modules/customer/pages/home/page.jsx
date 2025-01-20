import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Hash,
  Mail,
  Users,
  Globe,
  Activity,
  Trophy
} from 'lucide-react';
import DashboardLayout from '../dash_layout/page';
import Ticker from '../../../../components/Ticker';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [tickerData, setTickerData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const rowsPerPage = 6;
  const scrollerRef = useRef(null);

  const stats = [
    { icon: Users, label: 'Active Users', value: '500', trend: '+12%' },
    { icon: Trophy, label: 'Success Ratio', value: '98%', trend: '+1%' },
    { icon: Globe, label: 'Destinations', value: '50', trend: '+8%' },
    { icon: Activity, label: 'Carriers Interconnections', value: '250+', trend: '+2%' },
  ];

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await axios.get('https://backend.cloudqlobe.com/v3/api/clirates');
        setTickerData(response.data);
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }
    };
    fetchTickerData();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const customerId = decoded.id;
          const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${customerId}`);
          console.log(response.data,"data profile")
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);
  const company = {
    id: profileData?.customerId || "NA",
    name: profileData?.companyName || "NA",
    email: profileData?.companyEmail || "NA",
    country: profileData?.country || "NA"
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://backend.cloudqlobe.com/v3/api/rates");
        if (!response.ok) throw new Error("Failed to fetch data");
        const fetchedData = await response.json();
        const filteredData = fetchedData.filter(rate => rate.category === "specialrate");
        setData(filteredData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = getSortedData().slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
      <DashboardLayout>
     <div className="min-h-screen  w-full">
     <div className="flex flex-col bg-white items-center space-y-8 px-4 py-4 mx-auto" style={{width:"80em"}}>
            <div className=" " style ={{maxWidth:"100%", width:"100%"}}>
            <div className="flex bg-gray-200 rounded-lg shadow-lg p-6 gap-6">
                {/* Welcome Section */}
                <div className="w-1/3 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="text-orange-600" size={28} />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome back to our<br/>
                     dashboard 👋
                  </h1>
                  <p className="text-gray-500">Stay updated with our latest Updates</p>
                  <div className="flex space-x-2 mt-4">
                  
                  </div>
                </div>
  
                {/* Vertical Divider */}
                <div className="hidden md:block w-px bg-gray-100" />
  
                {/* Company Details Section */}
                <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Hash size={18} className="text-orange-600" />
                      <span className="text-sm font-medium text-gray-500">Customer ID</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-7">{company.id}</p>
                  </div>
  
                  <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Building2 size={18} className="text-orange-600" />
                      <span className="text-sm font-medium text-gray-500">Company Name</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-7">{company.name}</p>
                  </div>
  
                  <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Mail size={18} className="text-orange-600" />
                      <span className="text-sm font-medium text-gray-500">Contact Email</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-7">{company.email}</p>
                  </div>
  
                  <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Globe size={18} className="text-orange-600" />
                      <span className="text-sm font-medium text-gray-500">Country</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-7">{company.country}</p>
                  </div>
                </div>
              </div>
  
  
  
  
              <div className="relative rounded-lg">
        {/* Original scrolling content */}
  
        
        <div className="relative w-full">
        <div className="mt-4 mb-4"> <Ticker/> </div>
        </div>
        
        {/* Left fade gradient */}
        <div className="absolute left-0  top-0 h-full w-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, white, transparent)'
          }}
        />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 h-full w-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, white, transparent)'
          }}
        />
      </div>
  
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    {stats.map((stat, index) => {
      const Icon = stat.icon;
      const backgroundColors = [
        
        'bg-green-500', 
        'bg-orange-400',
        'bg-blue-400',  
        'bg-rose-500'      
      ];
      
      return (
        <div
          key={index}
          className={`p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
            selectedCard === index ? 'ring-2 ring-white-500' : ''
          } ${backgroundColors[index % backgroundColors.length]}`}
          onClick={() => setSelectedCard(index)}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Icon className="text-orange-600" size={24} />
            </div>
            <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-white' : 'text-red-500'}`}>
              {stat.trend}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mt-4">{stat.value}</h3>
          <p className="text-white text-sm">{stat.label}</p>
        </div>
      );
    })}
  </div>
    <div className="bg-white p-4 mx-4 rounded-xl shadow-sm overflow-hidden">
    <style>
      {`
        .custom-ticker-container {
          overflow: hidden;
          position: relative;
          white-space: nowrap;
        }
        .custom-scroller-content {
          display: inline-flex;
          animation: custom-scroll 25s linear infinite;
        }
        @keyframes custom-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .custom-ticker-item {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem;
          margin: 0 1rem;
          background-color: #FFF7ED;
          border-radius: 0.5rem;
          transition: transform 0.3s ease;
        }
        .custom-ticker-item:hover {
          transform: scale(1.05);
        }
        .custom-ticker-route {
          font-weight: 600;
          color: #1F2937;
  
        }
        .custom-ticker-rate {
          color: #EA580C;
          margin-left:.5rem;
        }
        .custom-ticker-trend-positive {
          color: #16A34A;
            margin-left:.5rem;
        }
        .custom-ticker-trend-negative {
          color: #DC2626;
        }
      `}
    </style>
  
    <div className="custom-ticker-container">
      <div ref={scrollerRef} className="custom-scroller-content">
        {/* Render the items twice for seamless scroll */}
        {[...tickerData, ...tickerData].map((item, index) => (
          <div
            key={index}
            className="custom-ticker-item"
          >
            <span className="custom-ticker-route">{item.country}</span>
            <span className="custom-ticker-rate">${item.rate}</span>
            <span className={item.qualityDescription? 'custom-ticker-trend-positive' : 'custom-ticker-trend-negative'}>
              {item.qualityDescription}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  };


export default Dashboard;