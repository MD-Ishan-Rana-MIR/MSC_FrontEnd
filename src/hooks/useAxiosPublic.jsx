import axios from "axios";

// const backendUrl = "http://localhost:5000"

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL 
})

const useAxiosPublic = () => {
  return axiosPublic;
}

export default useAxiosPublic;