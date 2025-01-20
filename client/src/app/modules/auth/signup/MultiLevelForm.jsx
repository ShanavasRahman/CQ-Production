import React, { useState } from "react";
import axios from "axios";
import UserInfo from "./UserInfo";
import CompanyInfo from "./CompanyInfo";
import TechnicalInfo from "./TechnicalInfo";
import axiosInstance from "../../admin/v2/utils/axiosinstance";
import { useNavigate } from "react-router-dom";


const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Company Info", color: "blue" },
    { number: 2, label: "Technical Info", color: "orange" },
    { number: 3, label: "User Info", color: "green" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`w-1/3 text-center cursor-pointer`}
          >
            <div
              className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= step.number
                ? `bg-${step.color}-500 text-white`
                : "bg-gray-300"
                }`}
            >
              {step.number}
            </div>
            <div
              className={`text-sm ${currentStep >= step.number
                ? `text-${step.color}-500 font-semibold`
                : "text-gray-500"
                }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`h-1 w-1/3 ${currentStep > index ? `bg-${step.color}-500` : "bg-gray-300"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const MultiStepForm = () => {
  const navigate = useNavigate()
  const [duplicatedData, setDuplicatedData] = useState({})
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    contactPerson: "",
    country: "",
    companyPhone: "",
    address: "",
    companyWebsite: "",
    supportEmail: "",
    sipSupport: "",
    switchIps: [],
    userFirstname: "",
    userLastname: "",
    username: "",
    userEmail: "",
    userMobile: "",
    password: "",
  });

  const nextStep = () => setStep(step + 1);
  const Previous = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
        console.log("Submitting form with data:", formData);
        const response = await axios.post("https://backend.cloudqlobe.com/v3/api/customers", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response);
        alert('Form submitted successfully');
        navigate("/signIn");
    } catch (error) {
        if (error.response && error.response.data.duplicateFields) {
            // Map duplicate fields to user-friendly messages
            const duplicateFields = error.response.data.duplicateFields;
            const newServerErrors = {};
            duplicateFields.forEach((field) => {
                if (field === "companyName") newServerErrors.companyName = "Company Name is already taken.";
                if (field === "companyEmail") newServerErrors.companyEmail = "Email is already in use.";
                if (field === "companyWebsite") newServerErrors.companyWebsite = "Company Website is already in use.";
                if (field === "username") newServerErrors.username = "Username is already in use.";
                if (field === "userEmail") newServerErrors.userEmail = "User Email is already in use.";
            });
            setDuplicatedData(newServerErrors);
            alert(`Duplicate fields: ${duplicateFields.join(", ")}`);
        } else {
            console.error("Error submitting form:", error.message);
            alert("An unexpected error occurred. Please try again.");
        }
    }
};


  return (
    <div className="container mx-auto px-4">
      <StepIndicator currentStep={step} />
      {step === 1 && <CompanyInfo duplicatedData={duplicatedData} setDuplicatedData={setDuplicatedData} onNext={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 2 && <TechnicalInfo onPrevious={Previous} onNext={nextStep} formData={formData} setFormData={setFormData} />}
      {step === 3 && <UserInfo duplicatedData={duplicatedData} setDuplicatedData={setDuplicatedData} onPrevious={Previous} onNext={handleSubmit} formData={formData} setFormData={setFormData} />}
    </div>
  );
};

export default MultiStepForm;
