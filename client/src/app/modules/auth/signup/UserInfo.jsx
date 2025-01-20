import React, { useState } from "react";

const UserInfo = ({ onNext, onPrevious, formData, setFormData, duplicatedData, setDuplicatedData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userFirstname?.trim()) newErrors.userFirstname = "First name is required.";
    if (!formData.userLastname?.trim()) newErrors.userLastname = "Last name is required.";
    if (!formData.username?.trim()) newErrors.username = "Username is required.";
    if (!formData.userEmail?.trim() || !/\S+@\S+\.\S+/.test(formData.userEmail))
      newErrors.userEmail = "Valid email is required.";
    if (!formData.userMobile?.trim() || !/^\d{10}$/.test(formData.userMobile))
      newErrors.userMobile = "Valid 10-digit phone number is required.";
    if (!formData.password?.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Clear error for the specific field

    setDuplicatedData((prevDuplicatedData) => {
      const updatedDuplicatedData = { ...prevDuplicatedData };
      delete updatedDuplicatedData[field];
      return updatedDuplicatedData;
    });
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            className={`w-full border rounded p-2 ${errors.userFirstname ? "border-red-500" : ""}`}
            placeholder="First name"
            value={formData.userFirstname || ""}
            onChange={(e) => handleFieldChange("userFirstname", e.target.value)}
            required
          />
          {errors.userFirstname && <p className="text-red-500 text-sm mt-1">{errors.userFirstname}</p>}
        </div>
        <div>
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            className={`w-full border rounded p-2 ${errors.userLastname ? "border-red-500" : ""}`}
            placeholder="Last name"
            value={formData.userLastname || ""}
            onChange={(e) => handleFieldChange("userLastname", e.target.value)}
            required
          />
          {errors.userLastname && <p className="text-red-500 text-sm mt-1">{errors.userLastname}</p>}
        </div>
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            className={`w-full border rounded p-2 ${errors.username || duplicatedData.username ? "border-red-500" : ""}`}
            placeholder="Username"
            value={formData.username || ""}
            onChange={(e) => handleFieldChange("username", e.target.value)}
            required
          />
          {(errors.username || duplicatedData.username) && (
            <p className="text-red-500 text-sm">{errors.username || duplicatedData.username}</p>
          )}        
          </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className={`w-full border rounded p-2 ${errors.userEmail || duplicatedData.userEmail ? "border-red-500" : ""}`}
            placeholder="User Email"
            value={formData.userEmail || ""}
            onChange={(e) => handleFieldChange("userEmail", e.target.value)}
            required
          />
          {(errors.userEmail || duplicatedData.userEmail) && (
            <p className="text-red-500 text-sm">{errors.userEmail || duplicatedData.userEmail}</p>
          )}         
          </div>
        <div>
          <label className="block mb-2">Phone</label>
          <input
            type="tel"
            className={`w-full border rounded p-2 ${errors.userMobile ? "border-red-500" : ""}`}
            placeholder="User Mobile"
            value={formData.userMobile || ""}
            onChange={(e) => handleFieldChange("userMobile", e.target.value)}
            required
          />
          {errors.userMobile && <p className="text-red-500 text-sm mt-1">{errors.userMobile}</p>}
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className={`w-full border rounded p-2 ${errors.password ? "border-red-500" : ""}`}
            placeholder="Password"
            value={formData.password || ""}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
