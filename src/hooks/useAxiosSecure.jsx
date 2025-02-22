import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  // Request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      // You can add any request-specific logic here (e.g., headers)
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        // Handle unauthorized or forbidden errors
        toast.error("Unauthorized access. Please log in again.");
        // Redirect to login page or perform logout
        // Example: navigate("/login");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;