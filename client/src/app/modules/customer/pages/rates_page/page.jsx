import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faStar,
  faCheckCircle,
  faPlusCircle,
  faFilter,
  faUserCircle,
  faClipboardList,
  faClipboardCheck,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import NormalRatesPage from './Rates/page';
import SpecialRatesPage from './SpecialRates/page';
import CLIRatesPage from '../cliRates/page'; // Import for CLI Rates
import PrivateRatesPage from './PrivateRates/page'; // Import for Private Rates
import MyRatesPage from '../myRates/page'; // Import for My Rates
import DashboardLayout from '../dash_layout/page';

// RatesNavbar Component
const RatesNavbar = ({ onTabChange }) => {
  return (
    <header className="flex justify-between items-center p-5 bg-gray-300 text-black shadow-lg mt-4">
      <nav className="flex justify-between items-center flex-grow gap-5">
        <div className="flex items-center gap-5">
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('ccRates')}
          >
            <FontAwesomeIcon icon={faChartLine} className="h-5 w-5" />
            <span className="text-base">CC Rates</span>
          </div>
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('myRates')}
          >
            <FontAwesomeIcon icon={faClipboardCheck} className="h-5 w-5" />
            <span className="text-base">My Rates</span>
          </div>
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('specialRates')}
          >
            <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
            <span className="text-base">Special Rates</span>
          </div>
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('privateRates')}
          >
            <FontAwesomeIcon icon={faClipboardCheck} className="h-5 w-5" />
            <span className="text-base">Private Rates</span>
          </div>
          <div
            className="cursor-pointer transition-colors duration-300 flex items-center text-black hover:text-[#D4AF37]"
            onClick={() => onTabChange('cliRates')}
          >
            <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5" />
            <span className="text-base">CLI Rates</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

// Main Rates Page Component
const RatesPage = () => {
  const [activeTab, setActiveTab] = useState('ccRates');
  const [search] = useState('');

  return (
    <DashboardLayout>
      <RatesNavbar onTabChange={setActiveTab} />
      <div className="min-h bg-gray-100 p-6">
        <div className="mt-6">
          {activeTab === 'ccRates' && <NormalRatesPage searchQuery={search} />}
          {activeTab === 'myRates' && <MyRatesPage searchQuery={search} />}
          {activeTab === 'specialRates' && <SpecialRatesPage searchQuery={search} />}
          {activeTab === 'privateRates' && <PrivateRatesPage searchQuery={search} />}
          {activeTab === 'cliRates' && <CLIRatesPage searchQuery={search} />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RatesPage;
