import React, { useState } from "react";

const TechnicalInfo = ({ onPrevious, onNext, formData, setFormData }) => {
  const [ips, setIps] = useState(formData.switchIps || []);
  const [currentIp, setCurrentIp] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const validateIp = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.supportEmail || !/\S+@\S+\.\S+/.test(formData.supportEmail)) {
      newErrors.supportEmail = "Valid support email is required.";
    }

    if (!formData.sipSupport || formData.sipSupport.trim() === "") {
      newErrors.sipSupport = "SIP Port is required.";
    }
    if (ips.length === 0) {
      setError("At least one Switch IP is required.");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRemoveIp = (ipToRemove) => {
    const updatedIps = ips.filter((ip) => ip !== ipToRemove);
    setIps(updatedIps);
    setFormData({ ...formData, switchIps: updatedIps });

    if (updatedIps.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, switchIps: "At least one Switch IP is required." }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      handleAddIp();
    }
  };

  const handleAddIp = () => {
    if (currentIp && validateIp(currentIp)) {
      if (!ips.includes(currentIp) && ips.length < 30) {
        const updatedIps = [...ips, currentIp];
        setIps(updatedIps);
        setCurrentIp("");
        setFormData({ ...formData, switchIps: updatedIps });
        setError('')
      } else {
        setError("IP address must be unique and limited to 30 entries.")
      }
    } else {
      setError("Please enter a valid IP address.")
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (field === "supportEmail" && /\S+@\S+\.\S+/.test(value)) {
        delete newErrors.supportEmail;
      }
      if (field === "sipSupport" && value.trim() !== "") {
        delete newErrors.sipSupport;
      }
      return newErrors;
    });
  };

  const handleNext = () => {
    let updatedIps = [...ips];

    // Validate and add the current IP if it's present
    if (currentIp) {
      if (validateIp(currentIp)) {
        if (!ips.includes(currentIp) && ips.length < 30) {
          updatedIps = [...ips, currentIp];
          setIps(updatedIps);
          setFormData({ ...formData, switchIps: updatedIps });
          setCurrentIp(""); // Clear the input
          setError('')

        } else {
          setError("IP address must be unique and limited to 30 entries.")
        }
      } else {
        setError("Please enter a valid IP address.")
      }
    }

    // Update formData.switchIps with the updated IP list
    setFormData({ ...formData, switchIps: updatedIps });

    // Validate the rest of the form
    if (validate()) {
      onNext(); // Navigate to the next page
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Technical Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Support Email</label>
          <input
            type="email"
            className={`w-full border rounded p-2 ${errors.supportEmail ? "border-red-500" : ""}`}
            placeholder="Support email"
            value={formData.supportEmail}
            onChange={(e) => handleInputChange("supportEmail", e.target.value)}
          />
          {errors.supportEmail && <p className="text-red-500 text-sm">{errors.supportEmail}</p>}
        </div>
        <div>
          <label className="block mb-2">SIP Port</label>
          <input
            type="text"
            className={`w-full border rounded p-2 ${errors.sipSupport ? "border-red-500" : ""}`}
            placeholder="SIP port"
            value={formData.sipSupport}
            onChange={(e) => handleInputChange("sipSupport", e.target.value)}
          />
          {errors.sipSupport && <p className="text-red-500 text-sm">{errors.sipSupport}</p>}
        </div>
        <div>
          <label className="block mb-2">Switch IP</label>
          <div className="flex items-center">
            <input
              type="text"
              className={`w-full border rounded p-2 ${error ? "border-red-500" : ""}`}
              placeholder="Enter Switch IP"
              value={currentIp}
              onChange={(e) => setCurrentIp(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleAddIp}
            >
              Add IP
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-2 flex flex-wrap">
            {ips.map((ip, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
              >
                {ip}
                <button
                  type="button"
                  onClick={() => handleRemoveIp(ip)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="mt-6 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TechnicalInfo;