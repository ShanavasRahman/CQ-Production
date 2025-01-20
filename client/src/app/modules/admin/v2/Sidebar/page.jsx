import React, { useContext } from "react";
import '../Dashboard/dashboard.css';
import { useNavigate } from "react-router-dom";
import {
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChevronRightIcon,
  LifebuoyIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  UserIcon,
  DocumentCurrencyBangladeshiIcon,

} from "@heroicons/react/24/outline";
import LogoutButton from "../auth/logOut/page";
import adminContext from "../../../../../context/page";


const Topbar = () => {
  const navigate = useNavigate()
  const { adminDetails } = useContext(adminContext)

  return (
    <header className="w-full p-4 bg-white shadow-xl border-b-4 border-gray-300 flex items-center justify-between">
      <nav className="flex space-x-8 items-left">
        <div>
          <a href="/admin/dashboard">
            <ChartBarSquareIcon className="w-10 h-10 text-yellow-600 mr-14" />
          </a>
        </div>
        {[ "carrier","lead", "superAdmin"].includes(adminDetails.role) && (
          /* Leads Dropdown */
          <div className="relative group">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
              <ClipboardDocumentListIcon className="w-8 h-8 mr-3 text-indigo-500" />
              Leads
            </a>
            <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
              <a href="/admin/newLeads" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">New Leads</a>
              <a href="/admin/notification" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Follow Up</a>
              <a href="/admin/leads/email" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
              <a href="/admin/leads/report" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Reports</a>
              <a href="/admin/leads/messages" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
              <a href="/admin/leads/assistance" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
            </div>
          </div>
        )}


        {['sale', 'superAdmin'].includes(adminDetails.role) && (

          /* Sales Dropdown */
          <div className="relative group">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
              <ChartBarIcon className="w-8 h-8 mr-3 text-blue-500" />
              Sales
            </a>
            <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
              <a href="/admin/sale/leads" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Leads</a>
              <a href="/admin/sale/customer" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Customers</a>
              <a href="/admin/sale/followups" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
              <a href="/admin/sale/email" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
              <a href="/admin/sale/report" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Reports</a>
              <a href="/admin/sale/messages" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
              <a href="/admin/sale/assistance" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
            </div>
          </div>
        )}
        {/* Carriers Dropdown */}
        {["sale", "carrier", "superAdmin"].includes(adminDetails.role) && (

          <div className="relative group">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
              <UserGroupIcon className="w-8 h-8 mr-3 text-green-500" />
              Carriers
            </a>
            <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
              <a href="/admin/carrier/leads" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Leads</a>
              <a href="/admin/carrier/carrier" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Carriers</a>
              <a href="/admin/carrier/followup" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
              <a href="/admin/carrier/email" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
              <a href="/admin/carrier/report" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Reports</a>
              <a href="/admin/carrier/messages" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
              <a href="/admin/carrier/assistance" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
            </div>
          </div>
        )}

        {["account", "carrier", "sale", "superAdmin"].includes(adminDetails.role) && (

          <div className="relative group">
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-indigo-600 text-base"
            >
              <DocumentCurrencyBangladeshiIcon className="w-8 h-8 mr-3 text-yellow-500" />
              Accounts
            </a>
            <div className="dropdown absolute left-0 mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10 group-hover:block">
              <div
                className="relative group"
                onClick={() => {
                  // Show the sub-dropdown
                  document.getElementById('ratesSubMenu').style.display = 'block';
                }}
                onMouseLeave={() => {
                  // Hide the sub-dropdown
                  document.getElementById('ratesSubMenu').style.display = 'none';
                }}
              >
                <a
                  href="#"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Rate
                  <ChevronRightIcon className="w-5 h-5 ml-1 text-gray-500" />
                </a>
                <div
                  id="ratesSubMenu"
                  className="absolute right-0 mt-0 bg-white border border-orange-500 shadow-lg rounded-lg w-56 hidden"
                  style={{
                    right: '-100%', // Adjust the right position to show the sub-dropdown to the right side
                    bottom: '-120px' // Move the sub-dropdown slightly higher
                  }}
                >
                  <a
                    href="/admin/ccrates"
                    className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    CC Rates
                  </a>
                  <a
                    href="/admin/clirates"
                    className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    CLI Rates
                  </a>
                  <a
                    href="/admin/specialrates"
                    className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    Special Rates
                  </a>
                  <a
                    href="/admin/targetedrates"
                    className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    Targeted Rates
                  </a>
                </div>
              </div>

              <div
                className="relative group"
                onClick={() => {
                  // Show the sub-dropdown
                  document.getElementById('rechargeSubMenu').style.display = 'block';
                }}
                onMouseLeave={() => {
                  // Hide the sub-dropdown
                  document.getElementById('rechargeSubMenu').style.display = 'none';
                }}
              >
                <a
                  href="#"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Recharge

                  <ChevronRightIcon className="w-5 h-5 ml-1 text-gray-500" />
                </a>
                <div
                  id="rechargeSubMenu"
                  className="absolute right-0 mt-0 bg-white border border-orange-500 shadow-lg rounded-lg w-56 hidden"
                  style={{
                    right: '-100%', // Adjust the right position to show the sub-dropdown to the right side
                    bottom: '-40px' // Move the sub-dropdown slightly higher
                  }}
                >
                  <a
                    href="/admin/recharge"
                    className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    Recharge Form
                  </a>
                  <a
                    href="/admin/vendor_form"
                    className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    Vendor Form
                  </a>
                </div>
              </div>
              {["account", "superAdmin"].includes(adminDetails.role) && (
                <>
                  <div
                    className="relative group"
                    onClick={() => {
                      // Show the sub-dropdown
                      document.getElementById('requestSubMenu').style.display = 'block';
                    }}
                    onMouseLeave={() => {
                      // Hide the sub-dropdown
                      document.getElementById('requestSubMenu').style.display = 'none';
                    }}
                  >
                    <a
                      href="#"
                      style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      Requests
                      <ChevronRightIcon className="w-5 h-5 ml-1 text-gray-500" />
                    </a>
                    <div
                      id="requestSubMenu"
                      className="absolute right-0 mt-0 bg-white border border-orange-500 shadow-lg rounded-lg w-56 hidden"
                      style={{
                        right: '-100%', // Adjust the right position to show the sub-dropdown to the right side
                        bottom: '-120px' // Move the sub-dropdown slightly higher
                      }}
                    >
                      <a
                        href="/admin/recharge_requests"
                        className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                      >
                        Recharge Requests
                      </a>
                      <a
                        href="/admin/vendorpayment"
                        className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                      >
                        Vendor Payment
                      </a>
                      <a
                        href="/admin/overdraft_requests"
                        className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                      >
                        Over Draft Requests
                      </a>
                      <a
                        href="/admin/privaterate_requests"
                        className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
                      >
                        Private Rate Requests
                      </a>
                    </div>
                  </div>

                  <a href="/admin/account/report" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                    Reports
                  </a>
                  <a href="/admin/account/email" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                    Emails
                  </a>
                  <a href="/admin/account/myticket" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                    My Ticket
                  </a>
                  <a href="/admin/account/followup" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                    Followups
                  </a>
                  <a href="/admin/account/messages" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                    Messages
                  </a>
                  <a href="/admin/account/assistance" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                    Internal Assistance
                  </a>
                </>
              )}
            </div>
          </div>
        )}

        {/* Support Dropdown */}
        {["superAdmin", "support"].includes(adminDetails.role) && (
          <div className="relative group">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
              <LifebuoyIcon className="w-8 h-8 mr-3 text-red-500" />
              Support
            </a>
            <div className="dropdown absolute left-0 hidden mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
              <a href="/admin/support/troubleTickets" className="block px-6 py-3 text-gray-600 ">Trouble Ticket</a>
              <a href="/admin/support/testing" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Testing</a>
              <a href="/admin/support/followups" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
              <a href="/admin/support/task" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Tasks</a>
              <a href="/admin/support/myTickets" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">My Ticket</a>
              <a href="/admin/support/email" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
              <a href="/admin/support/messages" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
              <a href="/admin/support/internalassistence" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
            </div>
          </div>
        )}


        {/* Communications Dropdown */}
        {["superAdmin", "lead"].includes(adminDetails.role) && (

          <div className="relative group">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
              <EnvelopeIcon className="w-8 h-8 mr-3 text-purple-500" />
              Communications
            </a>
            <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
              <a href="/admin/communication/enquiry" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Enquires</a>
              <a href="/admin/communication/didEnquiry" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">DID Numbers</a>
              <a href="/admin/communication/email" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
              <a href="/admin/communication/chatpanel" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Chat Panel</a>
              <a href="/admin/communication/messages" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                Messages
              </a>
              <a href="/admin/communication/assistance" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
                Internal Assistance
              </a>
            </div>
          </div>
        )}
        {/* Settings Dropdown */}
        
        <div className="relative group">
          <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
            <Cog6ToothIcon className="w-8 h-8 mr-3 text-gray-500" />
            Settings
          </a>
          <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          {["superAdmin"].includes(adminDetails.role) && (
            <a href="/admin/settings_page" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">User Management</a>
          )}
            <a href="/admin/customermanagement" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">CRM Management</a>
            <a href="/admin/staffmanagement" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Staff Management</a>
          </div>
        </div>
      </nav>
      {["superAdmin"].includes(adminDetails.role) && (

      <div className="relative group">
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 text-sm">
          <UserIcon className="w-5 h-5 mr-2" />
          <span className="text-sm">SUPER ADMIN</span>
        </button>

        {/* Dropdown Menu */}
        <div className="dropdown absolute right-0 hidden group-hover:block mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48 z-10">
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">ACCOUNT</a>
        </div>
      </div>
              )}
      <LogoutButton />

    </header>
  );
};

export default Topbar;