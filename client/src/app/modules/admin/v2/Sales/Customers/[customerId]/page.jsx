import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  MdPerson,
  MdAttachMoney,
  MdHelp,
  MdMessage,
  MdMonetizationOn,
  MdArrowDropDown,
} from "react-icons/md";
import clsx from "clsx";
import Layout from "../../../layout/page";
import ProfileTab from "./components/Profile";
import PaymentsTab from "./components/Payments";
import SupportTab from "./components/Support";
import FollowUpTab from "./components/Followups";
import Rates from "./components/Rates";
import PrivateRates from "./components/PrivateRates";
import FormFollowUpTab from "./components/Formfollow";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: MdPerson,
    color: "bg-red-500",
  },
  {
    id: "rates",
    label: "Rates",
    icon: MdMonetizationOn,
    color: "bg-blue-500",
    submenu: [
      { id: "rates1", label: "Base Rates", path: "Rates" },
      { id: "rates2", label: "Private Rates", path: "PrivateRates" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: MdAttachMoney,
    color: "bg-green-500",
  },
  {
    id: "support",
    label: "Support",
    icon: MdHelp,
    color: "bg-yellow-500",
  },
  {
    id: "followup",
    label: "Follow-Ups",
    icon: MdMessage,
    color: "bg-indigo-500",
  },
];

const SaleCustomerLeadDetails = () => {
  const { customerId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleTabClick = (tab) => {
    if (tab.submenu) {
      setDropdownOpen((prev) => (prev === tab.id ? null : tab.id));
    } else {
      setActiveTab(tab.id);
      setDropdownOpen(null);
    }
  };
  console.log(customerId, "This is the customer iddddddddddddddddd")
  const handleSubItemClick = (subItem) => {
    setActiveTab(subItem.id);
    setDropdownOpen(null);
  };

  return (
    <Layout>
      <div className="p-4 bg-white">
        {/* Tabs Navigation */}
        <div className="flex justify-around space-x-2 mb-6">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative flex-1">
              <motion.button
                className={clsx(
                  "flex items-center w-full px-4 py-3 rounded transition-all shadow-md",
                  tab.color,
                  "text-white"
                )}
                style={{ borderRadius: "4px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabClick(tab)}
              >
                <tab.icon size={24} className="text-white" />
                <span className="ml-2 font-medium text-sm">{tab.label}</span>
                {tab.submenu && (
                  <MdArrowDropDown
                    className={clsx(
                      "ml-1 transition-transform",
                      dropdownOpen === tab.id ? "rotate-180" : "",
                      "text-white"
                    )}
                    size={20}
                  />
                )}
              </motion.button>
              {tab.submenu && dropdownOpen === tab.id && (
                <div className="absolute left-0 mt-2 w-full bg-indigo-400 shadow-lg rounded-lg z-20">
                  {tab.submenu.map((subItem) => (
                    <motion.button
                      key={subItem.id}
                      className="block w-full text-left px-3 py-2 text-white  hover:bg-white-400"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSubItemClick(subItem)}
                    >
                      {subItem.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="bg-gray-300 rounded-lg ">
          {activeTab === "profile" && <ProfileTab customerId={customerId} />}
          {activeTab === "rates1" && <Rates customerId={customerId} />}
          {activeTab === "rates2" && <PrivateRates customerId={customerId} />}
          {activeTab === "payments" && <PaymentsTab customerId={customerId} />}
          {activeTab === "support" && <SupportTab customerId={customerId} />}
          {activeTab === "followup" && (
            <FollowUpTab setActiveTab={setActiveTab} customerId={customerId} />
          )}
          {activeTab === "formfollow" && (
            <FormFollowUpTab setActiveTab={setActiveTab} customerId={customerId} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SaleCustomerLeadDetails;