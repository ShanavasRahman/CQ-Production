import React, { useState } from "react";

const CompanyInfo = ({
  onNext,
  formData,
  setFormData,
  duplicatedData,
  setDuplicatedData,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required.";
    if (!formData.companyEmail || !/\S+@\S+\.\S+/.test(formData.companyEmail))
      newErrors.companyEmail = "Valid email is required.";
    if (!formData.contactPerson)
      newErrors.contactPerson = "Contact Person is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (
      !formData.companyPhone?.trim() ||
      !/^\d{10}$/.test(formData.companyPhone)
    )
      newErrors.companyPhone = "Valid phone number is required.";
    if (
      !formData.companyWebsite ||
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.companyWebsite)
    )
      newErrors.companyWebsite = "Valid website URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Clear errors for the updated field
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];
      return updatedErrors;
    });

    // Clear server-side duplicate error for the updated field
    setDuplicatedData((prevDuplicatedData) => {
      const updatedDuplicatedData = { ...prevDuplicatedData };
      delete updatedDuplicatedData[field];
      return updatedDuplicatedData;
    });
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>Company Info</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mr-2'>
          <label className='block mb-2'>Company Name</label>
          <input
            type='text'
            className={`w-full border rounded p-2 ${
              errors.companyName || duplicatedData.companyName
                ? "border-red-500"
                : ""
            }`}
            placeholder='Company name'
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            required
          />
          {(errors.companyName || duplicatedData.companyName) && (
            <p className='text-red-500 text-sm'>
              {errors.companyName || duplicatedData.companyName}
            </p>
          )}
        </div>
        <div className='ml-2'>
          <label className='block mb-2'>Company Email</label>
          <input
            type='email'
            className={`w-full border rounded p-2 ${
              errors.companyEmail || duplicatedData.companyEmail
                ? "border-red-500"
                : ""
            }`}
            placeholder='Email'
            value={formData.companyEmail}
            onChange={(e) => handleInputChange("companyEmail", e.target.value)}
            required
          />
          {(errors.companyEmail || duplicatedData.companyEmail) && (
            <p className='text-red-500 text-sm'>
              {errors.companyEmail || duplicatedData.companyEmail}
            </p>
          )}
        </div>
        <div className='mr-2'>
          <label className='block mb-2'>Contact Person</label>
          <input
            type='text'
            className='w-full border rounded p-2'
            placeholder='Name'
            value={formData.contactPerson}
            onChange={(e) => handleInputChange("contactPerson", e.target.value)}
            required
          />
          {errors.contactPerson && (
            <p className='text-red-500 text-sm'>{errors.contactPerson}</p>
          )}
        </div>
        <div className='ml-2'>
          <label className='block mb-2'>Country</label>
          <select
            className={`w-full border rounded p-2 ${
              errors.country ? "border-red-500" : ""
            }`}
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            required>
            <option value='India' selected>
              India
            </option>
            <option value='USA'>United States</option>
            <option value='UK'>United Kingdom</option>
            <option value='Australia'>Australia</option>
            <option value='Canada'>Canada</option>
            <option value='Germany'>Germany</option>
            <option value='France'>France</option>
            <option value='China'>China</option>
            <option value='Japan'>Japan</option>
            <option value='Russia'>Russia</option>
            <option value='Brazil'>Brazil</option>
            <option value='South Africa'>South Africa</option>
            <option value='Italy'>Italy</option>
            <option value='Spain'>Spain</option>
            <option value='Mexico'>Mexico</option>
            <option value='Argentina'>Argentina</option>
            <option value='South Korea'>South Korea</option>
            <option value='New Zealand'>New Zealand</option>
            <option value='Sweden'>Sweden</option>
            <option value='Netherlands'>Netherlands</option>
            {/* Add more countries */}
          </select>
          {errors.country && (
            <p className='text-red-500 text-sm'>{errors.country}</p>
          )}
        </div>
        <div className='mr-2'>
          <label className='block mb-2'>Company Phone</label>
          <input
            type='tel'
            className={`w-full border rounded p-2 ${
              errors.companyPhone ? "border-red-500" : ""
            }`}
            placeholder='Phone'
            value={formData.companyPhone}
            onChange={(e) => handleInputChange("companyPhone", e.target.value)}
            required
          />
          {errors.companyPhone && (
            <p className='text-red-500 text-sm'>{errors.companyPhone}</p>
          )}

          <div className='mt-4'>
            <label className='block mb-2'>Company Website</label>
            <input
              type='url'
              className={`w-full border rounded p-2 ${
                errors.companyWebsite ? "border-red-500" : ""
              }`}
              placeholder='Website'
              value={formData.companyWebsite}
              onChange={(e) =>
                handleInputChange("companyWebsite", e.target.value)
              }
              required
            />
            {(errors.companyWebsite || duplicatedData.companyWebsite) && (
              <p className='text-red-500 text-sm'>
                {errors.companyWebsite || duplicatedData.companyWebsite}
              </p>
            )}
          </div>
        </div>
        <div className='ml-2'>
          <label className='block mb-2'>Address</label>
          <textarea
            style={{ height: "79%" }}
            className='w-full border rounded p-2'
            placeholder='Address'
            rows={3}
            value={formData.address}
            onChange={(e) =>
              handleInputChange("address", e.target.value)
            }></textarea>
        </div>
        <div></div>
      </div>

      <button
        onClick={handleNext}
        className='mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
        Next
      </button>
    </div>
  );
};

export default CompanyInfo;
