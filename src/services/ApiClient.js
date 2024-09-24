import axios from "axios";
import AppConfig from "../configs/AppConfig";

const apiClient = axios.create({
  baseURL: AppConfig.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example of an interceptor to add authorization token if needed
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const registerJobSeeker = async (payload) => {
  const response = await apiClient.post("/jobseekers/register", payload);
  return response.data;
};

export const loginJobSeeker = async (payload) => {
  const response = await apiClient.post("/jobseekers/login", payload);
  return response.data;
};
