import React, { useState, useEffect, useRef } from "react";
import { SlCalender } from "react-icons/sl";
import { LuCircleDollarSign } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { AiFillInteraction } from "react-icons/ai";
import { FaClipboardList, FaEnvelope, FaPhone, FaTags, FaRegCalendarAlt, FaClock, FaFileAlt, FaCircleNotch, FaICursor, FaCriticalRole, FaStopCircle } from "react-icons/fa";

const FollowUpTab = () => {
  const [followups, setFollowups] = useState([
    { _id: "1", followupDescription: ["Discuss project timeline"], followupTime: "2025-01-09T10:00:00Z" },
    { _id: "2", followupDescription: ["Review contract terms"], followupTime: "2025-01-08T14:00:00Z" },
    { _id: "3", followupDescription: ["Send invoice for December"], followupTime: "2025-01-07T09:00:00Z" },
  ]);
  const [newFollowUp, setNewFollowUp] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const followUpRef = useRef(null);

  useEffect(() => {
    followUpRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [followups]);

  const handleAddFollowUp = () => {
    if (!newFollowUp.trim()) return;
    const newFollowUpObj = {
      _id: String(Date.now()),
      followupDescription: [newFollowUp],
      followupTime: new Date().toISOString(),
    };
    setFollowups((prevFollowups) => [...prevFollowups, newFollowUpObj]);
    setNewFollowUp("");
    setIsFormVisible(false);
  };

  const handleClockButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Image Section */}
      <div className="w-1/2 p-6 flex items-center justify-center">
        <img
          src="/images/adminlLeadFollowUp.jpg"
          alt="Follow-up Illustration"
          className="w-full h-auto"
        />
      </div>

      {/* Follow-Up Section */}
      <div className="w-1/2 bg-white rounded-lg p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-500 flex items-center">
            <LuCircleDollarSign className="text-orange-300 mr-2 text-5xl" />
            Telivoiz LLC
          </h2>
          <button
            onClick={handleClockButtonClick}
            className="text-blue-500 p-3 rounded-lg flex items-center justify-center"
          >
            <SlCalender className="mr-2 text-4xl" />
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden flex-grow flex flex-col-reverse mb-8 shadow-sm">
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
            {followups.length > 0 ? (
              followups.map((followup) => (
                <div key={followup._id} className="flex items-center justify-between">
                  <div className="flex-grow bg-indigo-100 p-5 rounded-lg">
                    <p className="font-medium text-gray-800">{followup.followupDescription.join(", ")}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(followup.followupTime).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No notes available</div>
            )}
            <div ref={followUpRef}></div>
          </div>
        </div>

        {isFormVisible && (
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <AiFillInteraction  className="text-blue-500 mr-3 text-5xl" />
                Follow-Up Information
              </h3>
              <form className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaClipboardList className="mr-2 text-lg" />
                      Follow-Up Description
                    </label>
                    <input
                      type="text"
                      className="p-3 border rounded-lg w-full"
                      placeholder="Enter description"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaEnvelope className="mr-2 text-lg" />
                      Follow-Up Method
                    </label>
                    <select className="p-3 border rounded-lg w-full">
                      <option>Email</option>
                      <option>Phone</option>
                      <option>In-person</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaTags className="mr-2 text-lg" />
                      Follow-Up Category
                    </label>
                    <select className="p-3 border rounded-lg w-full">
                      <option>Sales</option>
                      <option>Support</option>
                      <option>General</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaRegCalendarAlt className="mr-2 text-lg" />
                      Date
                    </label>
                    <input
                      type="date"
                      className="p-3 border rounded-lg w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaClock className="mr-2 text-lg" />
                      Time
                    </label>
                    <input
                      type="time"
                      className="p-3 border rounded-lg w-full"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <FaFileAlt className="mr-2 text-lg" />
                      Additional Notes
                    </label>
                    <input
                      type="text"
                      className="p-3 border rounded-lg w-full"
                      placeholder="Add any notes"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handleAddFollowUp}
                    className="bg-orange-500 text-white py-2 px-5 rounded-lg"
                  >
                    Add Follow-Up
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white py-2 px-5 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 mt-6">
          <textarea
            value={newFollowUp}
            onChange={(e) => setNewFollowUp(e.target.value)}
            placeholder="Type your note..."
            className="flex-grow h-12 p-4 bg-white rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleAddFollowUp}
            className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full shadow-md hover:from-green-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform transform hover:scale-110 flex items-center justify-center"
          >
            <IoMdSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpTab;