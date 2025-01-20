import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosinstance';
import Layout from '../../../layout/page';
import { User, Mail, Phone, Globe, MapPin, Calendar, Flag, RefreshCw, Briefcase, Users, Link, FileText } from 'lucide-react';

const LeadDetails = () => {
  const [leadData, setLeadData] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();
  const customerId = params.customerId;
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedLeadInfo, setUpdatedLeadInfo] = useState({});

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axiosInstance.get(`v3/api/customers/${customerId}`);
        setLeadData(response.data);
      } catch (error) {
        console.error("Error fetching lead details:", error);
        setError("Failed to fetch lead details.");
      } finally {
        setLoading(false);
      }
    };
    
    if (customerId) fetchLeadData();
    
    return () => {
      setLeadData(null);
      setError(null);
      setSuccessMessage("");
    };
  }, [customerId]);

  const handleConversion = async (type) => {
    try {
      await axiosInstance.put(`v3/api/customers/${customerId}`, { customerType: type });
      setSuccessMessage("Conversion successful");
      setLeadData(prev => ({ ...prev, customerType: type }));
    } catch (error) {
      console.error("Error converting lead:", error);
      setError("Failed to convert lead.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLeadInfo({ ...updatedLeadInfo, [name]: value });
  };

  const handleUpdateLead = async () => {
    try {
      const response = await axiosInstance.put(`v3/api/customers/${customerId}`, updatedLeadInfo);
      console.log('Lead updated successfully:', response.data);
      setUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleStatusChange = async () => {
    try {
      await axiosInstance.put(`v3/api/customers/${customerId}`, { leadStatus: newStatus });
      setSuccessMessage("Lead status updated");
      setNewStatus("");
      setLeadData(prev => ({ ...prev, leadStatus: newStatus }));
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update lead status.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">{leadData?.companyName || "Company Name Not Available"}</h1>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p className="font-bold">Success</p>
              <p>{successMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoSection title="Company Information" icon={<Briefcase className="text-orange-500" />}>
              <InfoItem icon={<Globe className="text-blue-500" />} label="Company Name" value={leadData?.companyName || "Not Provided"} />
              <InfoItem icon={<Mail className="text-blue-500" />} label="Company Email" value={leadData?.companyEmail || "Not Provided"} />
              <InfoItem icon={<Phone className="text-blue-500" />} label="Company Phone" value={leadData?.companyPhone || "Not Provided"} />
              <InfoItem icon={<MapPin className="text-blue-500" />} label="Address" value={leadData?.address || "Not Provided"} />
              <InfoItem icon={<Globe className="text-blue-500" />} label="Country" value={leadData?.country || "Not Provided"} />
              <InfoItem 
                icon={<Link className="text-blue-500" />} 
                label="Website" 
                value={leadData?.companyWebsite ? (
                  <a href={leadData.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {leadData.companyWebsite}
                  </a>
                ) : "Not Provided"}
              />
            </InfoSection>

            <InfoSection title="Contact Information" icon={<Users className="text-orange-500" />}>
              <InfoItem icon={<User className="text-blue-500" />} label="Contact Person" value={leadData?.contactPerson || "Not Provided"} />
              <InfoItem icon={<User className="text-blue-500" />} label="User First Name" value={leadData?.userFirstname || "Not Provided"} />
              <InfoItem icon={<User className="text-blue-500" />} label="User Last Name" value={leadData?.userLastname || "Not Provided"} />
              <InfoItem icon={<Mail className="text-blue-500" />} label="User Email" value={leadData?.userEmail || "Not Provided"} />
              <InfoItem icon={<Phone className="text-blue-500" />} label="User Mobile" value={leadData?.userMobile || "Not Provided"} />
              <InfoItem icon={<Mail className="text-blue-500" />} label="Support Email" value={leadData?.supportEmail || "Not Provided"} />
            </InfoSection>

            <InfoSection title="Lead Details" icon={<Flag className="text-orange-500" />}>
              <InfoItem icon={<Flag className="text-blue-500" />} label="Lead Type" value={leadData?.leadStatus || "Not Provided"} />
              <InfoItem icon={<Flag className="text-blue-500" />} label="User Type" value={leadData?.customerType || "Not Provided"} />
              <InfoItem icon={<Flag className="text-blue-500" />} label="Customer Status" value="Not Provided" />
              <InfoItem icon={<Flag className="text-blue-500" />} label="Follow Up Status" value="Not Provided" />
              <InfoItem icon={<Calendar className="text-blue-500" />} label="Created At" value={leadData?.createdAt ? new Date(leadData.createdAt).toLocaleString() : "Not Provided"} />
            </InfoSection>

            <InfoSection title="Technical Details" icon={<FileText className="text-orange-500" />}>
              <InfoItem icon={<Globe className="text-blue-500" />} label="SIP Support" value={leadData?.sipSupport || "Not Provided"} />
              <InfoItem icon={<FileText className="text-blue-500" />} label="Codex" value={leadData?.codex || "Not Provided"} />
              <InfoItem icon={<Globe className="text-blue-500" />} label="Switch IPs" value={leadData?.switchIps?.length > 0 ? leadData.switchIps.join(', ') : "No IPs Available"} />
              <InfoItem icon={<FileText className="text-blue-500" />} label="My Rates IDs" value="No Rates Available" />
              <InfoItem icon={<FileText className="text-blue-500" />} label="Tickets IDs" value="No Tickets Available" />
            </InfoSection>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lead Actions</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={() => setUpdateModalOpen(true)} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update Details
                  </button>

                  {/* Update Lead Modal */}
                  {updateModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-8 rounded-lg">
                        <h3 className="text-lg font-bold">Update Lead Information</h3>
                        <input 
                          type="text" 
                          name="companyName" 
                          value={updatedLeadInfo.companyName || ''} 
                          onChange={handleInputChange} 
                          className="w-full p-2 mt-4 border border-gray-300 rounded-md"
                          placeholder="Company Name"
                        />
                        <div className="flex justify-end mt-4">
                          <button onClick={handleUpdateLead} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                            Update
                          </button>
                          <button onClick={() => setUpdateModalOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ml-4">
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium">Change Lead Status:</h3>
                <input
                  type="text"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md mt-4"
                  placeholder="New Status"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleStatusChange}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Update Status
                  </button>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-8">
                <button 
                  onClick={() => handleConversion("customer")} 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Convert to Customer
                </button>
                <button 
                  onClick={() => handleConversion("rejected")} 
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const InfoSection = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-2 mb-6">
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <p className="text-gray-600 font-medium">{label}:</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default LeadDetails;
