import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// Add a request interceptor to include the authorization token
axiosSecure.interceptors.request.use(
  (config) => {
    // Get the user token from localStorage
    const userToken = localStorage.getItem("user-token");

    if (userToken) {
      // Add the authorization header
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosSecure.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the response is 401 (Unauthorized), the token might be expired
    if (error.response?.status === 401) {
      // Remove the expired token
      localStorage.removeItem("user-token");
      // Optionally redirect to login page
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure;
}

export default useAxiosSecure;
