import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./app/modules/admin/v2/auth/page.js";

// Public Pages
import Home from './pages/Home.jsx'
import About from "./app/about/page.jsx";
import ContactForm from "./app/contacts/page.jsx";
import CC_Routes from "./app/services/CC-Routes/page.jsx";
import CLI_Voice_Termination from "./app/services/CLI-Voice-Termination/page.jsx";
import DID_Voice_Solutions from "./app/services/DID-Voice-Solutions/page.jsx";
import VoIPRates from "./app/pricing/page.jsx";
import FAQPage from "./app/faq/page.jsx";
import LoginFrame from "./app/modules/auth/Base/login/page.jsx";
import SignUpPage from "./app/modules/auth/signup/page.jsx";   //gh


import Dashboard from "./app/modules/customer/pages/home/page.jsx";
import ProfilePage from "./app/modules/customer/pages/profile-page/page.jsx";
import PaymentsPage from "./app/modules/customer/pages/payments_page/page.jsx";
import HomePage from "./pages/Home.jsx";
import FollowUp from "./app/modules/customer/pages/trouble_page/page.jsx";
import NormalRatesPage from "./app/modules/customer/pages/rates_page/Rates/page.jsx";
import MyRates from './app/modules/customer/pages/myRates/page.jsx'
import PrivateRates from './app/modules/customer/pages/rates_page/PrivateRates/page.jsx'
import CliRates from './app/modules/customer/pages/cliRates/page.jsx'
import AdminDahboard from './app/modules/admin/v2/Dashboard/page.jsx'
import SpecialRates from './app/modules/customer/pages/rates_page/SpecialRates/page.jsx'
import Newleads from '../src/app/modules/admin/v2/Leads/NewLeads/page'
import Notification from '../src/./app/modules/admin/v2/Leads/Followups/page'

// adminSale
import Leads from '../src/app/modules/admin/v2/Sales/Leads/page'
import Customer from '../src/app/modules/admin/v2/Sales/Customers/page'
import Followups from '../src/app/modules/admin/v2/Sales/Followups/page'
import Emails from '../src/app/modules/admin/v2/Sales/Emails/page'
import Report from '../src/app/modules/admin/v2/Sales/Reports/page'
import Message from '../src/app/modules/admin/v2/Sales/Messages/page'
import Assistance from '../src/app/modules/admin/v2/Sales/internalAssistance/page'
import SaleLead from "./app/modules/admin/v2/Sales/Leads/[customerId]/page.jsx";
import SaleCustomerLeadDetails from "./app/modules/admin/v2/Sales/Customers/[customerId]/page.jsx";
import SalesDetailsFollowUp from "../src/app/modules/admin/v2/Sales/Followups/[id]/page.jsx";

import Carrier from '../src/app/modules/admin/v2/Carriers/Leads/page'
import Carriers from '../src/app/modules/admin/v2/Carriers/Carriers/page'
import CFollowups from '../src/app/modules/admin/v2/Carriers/Followups/page'
import CnewLeads from '../src/app/modules/admin/v2/Leads/NewLeads/[customerId]/page.jsx'
import AddLead from '../src/app/modules/admin/v2/Leads/NewLeads/AddLead/page'
import LeadDetails from "./app/modules/admin/v2/Carriers/Leads/[customerId]/page.jsx";
import CustomersPage from "./app/modules/admin/v2/Settings/CustomerManagement/page.jsx";
import SettingsPage from "./app/modules/admin/v2/Settings/page.jsx";
import RatesPage from "./app/modules/admin/v2/Rates/CCRates/page.jsx";
import AdminCli from "./app/modules/admin/v2/Rates/CLIRates/page.jsx";
import AdminPrivateRates from "./app/modules/admin/v2/Rates/PrivateRates/page.jsx";
import AdminSpecialRates from "./app/modules/admin/v2/Rates/SpecialRates/page.jsx";
import TroubleTickets from "./app/modules/admin/v2/Support/TroubleTickets/page.jsx";
import AdminFollowUp from "./app/modules/admin/v2/Support/FollowUps/page.jsx";
import TestingPage from "./app/modules/admin/v2/Support/Testing/page.jsx";
import Admintask from "./app/modules/admin/v2/Support/Tasks/page.jsx";
import PageUnderDevelopment from "./app/modules/admin/v2/Support/Messages/page.jsx";
import InternalAssistence from "./app/modules/admin/v2/Support/InternalAssistance/page.jsx";
import CSettingsPage from '../src/app/modules/customer/pages/settings/page'
import RateTableCli from "./app/clirates/page.jsx";
import RateTableSpecial from "./app/modules/customer/pages/rates_page/Rates/page.jsx";
import RateTableAdd from "./app/modules/customer/pages/rates_page/Rates/page.jsx";
import TechnicalInfo from "./app/modules/auth/signup/TechnicalInfo.jsx";

import AddTicket from './app/modules/customer/pages/trouble_page/Addfollowup/page.jsx'

import Dashccrates from './app/modules/customer/pages/dashboardccrates/page.jsx';
import Dashcli from './app/modules/customer/pages/dashclirates/page.jsx';
import DashSpecial from './app/modules/customer/pages/dashspecialrate/page.jsx'
import CCRateTable from "./app/components/CCRates.jsx";
import CLIRatesPage from "./app/modules/customer/pages/rates_page/CLIRates/page.jsx";
import CarrierDetailsFollowup from "../src/app/modules/admin/v2/Carriers/Followups/[id]/page.jsx";
import FollowUpDetailsLeads from "./app/modules/admin/v2/Leads/Followups/[id]/page.jsx";
import MyTickets from "./app/modules/admin/v2/Support/MyTicket/page.jsx";
import AccountsFollowUp from "./app/modules/admin/v2/Accounts/FollowUps/page.jsx";
import OverdraftRequestPage from "./app/modules/admin/v2/Requests/OverdraftRequests/page.jsx";
import RechargerequestPage from "./app/modules/admin/v2/Requests/RechargeRequests/page.jsx";
import VendorRequestPage from "./app/modules/admin/v2/Requests/Vendorpayment/page.jsx";
import RechargePage from "./app/modules/admin/v2/Accounts/Recharge/RechargeForm/page.jsx";
import TargetedRatePage from "./app/modules/admin/v2/Rates/PrivateRates/page.jsx";
import SpecialRatePage from "./app/modules/admin/v2/Rates/SpecialRates/page.jsx";
import PrivateRateRequestPage from "./app/modules/admin/v2/Requests/PrivaterateRequest/page.jsx";
// Communications
import EnquiryPage from "./app/modules/admin/v2/Communication/Enquiries/page.jsx";
import Didnumberenquiery from "./app/modules/admin/v2/Communication/DIDEnquiries/page.jsx";
import ChatPanel from "./app/modules/admin/v2/Communication/ChatBot/page.jsx";
import CommunicationMessagesDashboard from "./app/modules/admin/v2/Communication/Messages/page.jsx";
import CommunicationInternalAssistance from "./app/modules/admin/v2/Communication/InternalAssistance/page.jsx";
// Communications
import CreateAdminForm from "./app/modules/admin/v2/auth/login/page.jsx";
import InternalAssistance from "./app/modules/admin/v2/Leads/InternalAssistance/page.jsx";
import MessagesDashboard from "./app/modules/admin/v2/Leads/messages/page.jsx";
import SaleMessagesDashboard from "../src/app/modules/admin/v2/Sales/Messages/page";
import SaleInternalAssistance from "../src/app/modules/admin/v2/Sales/internalAssistance/page";
import CarriersInternalAssistance from "./app/modules/admin/v2/Carriers/InternalAssistance/page.jsx";
import CarriersMessagesDashboard from "./app/modules/admin/v2/Carriers/Messages/page.jsx";
import AccountsInternalAssistance from "./app/modules/admin/v2/Accounts/InternalAssistance/page.jsx";
import AccountsMessagesDashboard from "./app/modules/admin/v2/Accounts/Messages/page.jsx";
import SupportInternalAssistance from "./app/modules/admin/v2/Support/InternalAssistance/page.jsx";
import SupportMessagesDashboard from "./app/modules/admin/v2/Support/Messages/page.jsx";
import StaffPageUnderDevelopment from "./app/modules/admin/v2/Settings/StaffManagement/page.jsx";
import LeadEmail from "./app/modules/admin/v2/Leads/Emails/page.jsx";
import LeadReport from "./app/modules/admin/v2/Leads/Reports/page.jsx";
import CarrierEmail from "./app/modules/admin/v2/Carriers/Email/page.jsx";
import CarrierReport from "./app/modules/admin/v2/Carriers/Reports/page.jsx";
import AccountsEmail from "./app/modules/admin/v2/Accounts/Emails/page.jsx";
import AccountsReport from "./app/modules/admin/v2/Accounts/Reports/page.jsx";
import SupportEmail from "./app/modules/admin/v2/Support/Emails/page.jsx";
import CommunicationEmail from "./app/modules/admin/v2/Communication/Email/page.jsx";
import adminContext from "./context/page.jsx";
import VendorForm from "./app/modules/admin/v2/Accounts/Recharge/VendorForm/page.jsx";
import AccountsMyTicket from "./app/modules/admin/v2/Accounts/MyTicket/page.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/signIn" />;
}


const IsAuthenticate = ({ children }) => {

  const isValidToken = useAuth()
  console.log("isValidToken", isValidToken);
  if (isValidToken == null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isValidToken) {
    return <Navigate to="/admin/signin" replace />
  }

  return children;
};


function App() {
  const [adminDetails, setAdminDetails] = useState({
    username: '',
    role: ''
  })
  useEffect(() => {
  const data =  sessionStorage.getItem("adminData")
 setAdminDetails( JSON.parse(data) )

  },[])
  return (
    <adminContext.Provider value={{ adminDetails, setAdminDetails }} >

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/services/CC-Routes" element={<CC_Routes />} />
        <Route path="/services/CLI-Voice-Termination" element={<CLI_Voice_Termination />} />
        <Route path="/services/DID-Voice-Solutions" element={<DID_Voice_Solutions />} />
        <Route path="/pricing" element={<VoIPRates />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/Registers" element={<SignUpPage />} />
        <Route path="/signIn" element={<LoginFrame />} />


        {/* Admin Login */}
        <Route path="/admin/signin" element={<CreateAdminForm />} />

        <Route path="/admin/*" element={
          // <IsAuthenticate>
          <Routes>
            <Route path="/dashboard" element={<AdminDahboard />} />

            {/* Leads */}
            <Route path="/leads/assistance" element={<InternalAssistance />} />
            <Route path="/leads/messages" element={<MessagesDashboard />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/newLeads" element={<Newleads />} />
            <Route path="/NewLeads/:customerId" element={<CnewLeads />} />
            <Route path="/Addlead" element={<AddLead />} />
            <Route path="/detailfollowup/:followupId" element={<FollowUpDetailsLeads />} />
            <Route path="/leads/email" element={<LeadEmail />} />
            <Route path="/leads/report" element={<LeadReport />} />

            {/* Accounts */}
            <Route path="/recharge" element={<RechargePage />} />
            <Route path="/clirates" element={<AdminCli />} />
            <Route path="/ccrates" element={<RatesPage />} />
            <Route path="/targetedrates" element={<TargetedRatePage />} />
            <Route path="/specialrates" element={<SpecialRatePage />} />
            <Route path="/recharge_requests" element={<RechargerequestPage />} />
            <Route path="/vendorpayment" element={<VendorRequestPage />} />
            <Route path="/overdraft_requests" element={<OverdraftRequestPage />} />
            <Route path="/privaterate_requests" element={<PrivateRateRequestPage />} />
            <Route path="/account/followup" element={<AccountsFollowUp />} />
            <Route path="/account/messages" element={<AccountsMessagesDashboard />} />
            <Route path="/account/assistance" element={<AccountsInternalAssistance />} />
            <Route path="/account/email" element={<AccountsEmail />} />
            <Route path="/account/report" element={<AccountsReport />} />
            <Route path="/vendor_form" element={<VendorForm />} />
            <Route path="/account/myticket" element={<AccountsMyTicket />} />

            {/* AdminSale */}
            <Route path="/sale/leads" element={<Leads />} />
            <Route path="/sale/customer" element={<Customer />} />
            <Route path="/sale/followups" element={<Followups />} />
            <Route path="/sale/email" element={<Emails />} />
            <Route path="/sale/report" element={<Report />} />
            <Route path="/sale/messages" element={<SaleMessagesDashboard />} />
            <Route path="/sale/assistance" element={<SaleInternalAssistance />} />
            <Route path="/SaleLead/:customerId" element={<SaleLead />} />
            <Route path="/SaleLead/customer/:customerId" element={<SaleCustomerLeadDetails />} />
            <Route path="/sales/detailfollowp/:followupId" element={<SalesDetailsFollowUp />} />

            {/* AdminCarrier */}
            <Route path="/carrier/leads" element={<Carrier />} />
            <Route path="/carrier/carrier" element={<Carriers />} />
            <Route path="/carrier/followup" element={<CFollowups />} />
            <Route path="/carrier/detailfollowp/:followUpId" element={<CarrierDetailsFollowup />} />
            <Route path="/carrier/messages" element={<CarriersMessagesDashboard />} />
            <Route path="/carrier/assistance" element={<CarriersInternalAssistance />} />
            <Route path="/customer/lead-details/:customerId" element={<LeadDetails />} />
            <Route path="/carrier/email" element={<CarrierEmail />} />
            <Route path="/carrier/report" element={<CarrierReport />} />

            {/* support */}
            <Route path="/support/troubleTickets" element={<TroubleTickets />} />
            <Route path="/support/myTickets" element={<MyTickets />} />
            <Route path="/support/followups" element={<AdminFollowUp />} />
            <Route path="/support/testing" element={<TestingPage />} />
            <Route path="/support/task" element={<Admintask />} />
            <Route path="/support/email" element={<SupportEmail />} />
            <Route path="/support/messages" element={<SupportMessagesDashboard />} />
            <Route path="/support/internalassistence" element={<SupportInternalAssistance />} />

            {/* Communications */}
            <Route path="/communication/enquiry" element={<EnquiryPage />} />
            <Route path="/communication/didEnquiry" element={<Didnumberenquiery />} />
            <Route path="/communication/chatpanel" element={<ChatPanel />} />
            <Route path="/communication/email" element={<CommunicationEmail />} />
            <Route path="/communication/messages" element={<CommunicationMessagesDashboard />} />
            <Route path="/communication/assistance" element={<CommunicationInternalAssistance />} />

            {/* Settings */}
            <Route path="/settings_page" element={<SettingsPage />} />
            <Route path="/customermanagement" element={<CustomersPage />} />
            <Route path="/staffmanagement" element={<StaffPageUnderDevelopment />} />
          </Routes>
          //  </IsAuthenticate>
        }
        />

        {/* Customer Routes */}
        <Route path="/*" element={
          // <PrivateRoute>
          <Routes>
            <Route path="/dash-board" element={<Dashboard />} />
            <Route path="/Profile_page" element={<ProfilePage />} />
            <Route path="/Payment_page" element={<PaymentsPage />} />
            <Route path="/Home_page" element={<HomePage />} />
            <Route path="/Support_page" element={<FollowUp />} />
            <Route path="/CCRates_page" element={<NormalRatesPage />} />
            <Route path="/MyRates_page" element={<MyRates />} />
            <Route path="/PrivateRate_page" element={<PrivateRates />} />
            <Route path="/CliRates_page" element={<CliRates />} />
            <Route path="/SpecilaRate_page" element={<SpecialRates />} />
            <Route path="/cliratestable" element={<RateTableCli />} />

            {/* CLIRatesPage */}
            <Route path="/specialrates" element={<RateTableSpecial />} />
            <Route path="/clirates" element={<CLIRatesPage />} />
            <Route path="/addrates" element={<RateTableAdd />} />

            <Route path="/settings_page" element={<CSettingsPage />} />
            <Route path="/add-ticket" element={<AddTicket />} />
            <Route path='/dashboardccrates' element={<Dashccrates />} />
            <Route path='/dashclirates' element={<Dashcli />} />
            <Route path="/dashspecial" element={<DashSpecial />} />
          </Routes>
          //  </PrivateRoute>
        } />


        <Route path="/TechnicalInfo" element={<TechnicalInfo />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </adminContext.Provider>


  );
}

export default App;