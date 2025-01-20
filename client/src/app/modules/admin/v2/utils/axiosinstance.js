// utils/axiosInstance.js
import axios from 'axios';



// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_SERVER_URL || 'https://backend.cloudqlobe.com/' //https://backend.cloudqlobe.com/', // Ensure this points to your backend
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from local storage or cookies
    const token = localStorage.getItem('token'); // Adjust based on how you're storing the token

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
