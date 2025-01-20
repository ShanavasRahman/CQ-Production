import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import {toast,ToastContainer} from 'react-toastify';
import axios from "axios";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for showing password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const customerId = decoded.id;
          // Make an API call to check if the user is valid
          const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${customerId}`); // Adjust the endpoint as needed
          console.log(decoded.id);
          // If the user exists in the database, redirect to the dashboard
          if (response.data) {
            navigate("/modules/customer/pages/home");
          }
        } catch (error) {
          console.error("User not authenticated or token is invalid", error);
        }
      }
    };
    
    checkAuthentication();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
  
    try {
      // Make the login request
      const response = await axios.post("http://localhost:5000/v3/api/customers/login", {
        username,
        password,
      });
  
      // Show success toast with a small delay
      setTimeout(() => {
        toast.success("Successfully logged in!");
      }, 500);
  
      const data = response.data;
  
      // Store the JWT token
      localStorage.setItem("token", data.token);
  
      // Redirect to dashboard
      navigate("/dash-board");
    } catch (err) {
      if (err.response) {
        // Check the status code and show the corresponding toast message
        if (err.response.status === 404) {
          toast.error("Customer not found");
        } else if (err.response.status === 401 || err.response.status === 400) {
          toast.error("Invalid password");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        // Network error or other issues
        toast.error("Failed to connect. Please check your internet connection.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row bg-[#F7F5F4] p-8 rounded-lg bg-gray-100 shadow-md max-w-6xl mx-auto mt-24 mb-8">
    <ToastContainer/>
      <div className="md:w-1/2 mb-8 md:mb-0 px-16  ">
        <h1 className="text-3xl font-semibold mb-6">Sign In</h1>
        <img
          src="/images/15.svg"
          alt="Sign In Illustration"
          className="w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 ml-5 mt-10" style={{marginLeft:"43rem", marginTop:"-220px"}}>
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              User ID
            </label>
            <input
              style={{ width: "20em" }}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 border rounded-md"
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="mt-5" style={{ marginTop: "2em" }}>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              style={{ width: "20em" }}
              type={showPassword ? "text" : "password"} // Toggle between text and password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border rounded-md w-full"
              required
              disabled={loading} // Disable input while loading
            />{" "}
            &nbsp;
            <button
              type="button"
              className="mt-2 text-sm text-gray-600 hover:underline focus:outline-none"
              onClick={() => setShowPassword(!showPassword)} // Toggle show password
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <button
            onClick={() => navigate('/Registers')}
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
      {/* Display loading spinner or progress indicator */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-grey bg-opacity-75">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12"></div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
