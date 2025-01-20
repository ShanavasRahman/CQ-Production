import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Make a request to the backend to clear the session cookie
      const response = await axios.get("https://backend.cloudqlobe.com/v3/api/admin/adminToken", { withCredentials: true });

      if (response.data.message === "Logged out successfully") {
        // sessionStorage.removeItem("adminData")
        // Optionally, redirect to login or home page
        window.location.href = "/admin/signin"; // or use react-router-dom to navigate
        toast.success("Logged out successfully", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.", { position: "top-right" });
    }
  };

  return (
    <button onClick={handleLogout} className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
      LOGOUT
    </button>
  );
};

export default LogoutButton;
