import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const useAuth = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(null);
  useEffect(() => {
    fetchProtected();
  }, []);

  const fetchProtected = async () => {
    try {
      const response = await axios.get(
        "https://backend.cloudqlobe.com/v3/api/admin/adminAuthentication",
        { withCredentials: true }
      );
      if (response.data.message === "Route protected") {
        setIsAuthenticate(true);
      }
    } catch (error) {
      setIsAuthenticate(false);
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };
  return isAuthenticate;
};

export default useAuth