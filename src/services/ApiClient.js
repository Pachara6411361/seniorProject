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

export const registerRecruiter = async (payload) => {
  const response = await apiClient.post("/recruiters/register", payload);
  return response.data;
};

export const loginRecruiter = async (payload) => {
  const response = await apiClient.post("/recruiters/login", payload);
  return response.data;
};

export const getProfiles = async (query) => {
  let skillQuery = query ? `?skill=${query}` : "";

  const response = await apiClient.get(`/profiles${skillQuery}`);
  return response.data;
};

export const getProfileById = async (profileId) => {
  const response = await apiClient.get(`/profiles/${profileId}`);
  return response.data;
};

export const updateProfileById = async (userId, payload) => {
  const response = await apiClient.patch(`/jobseekers/${userId}/profile`, payload);
  return response.data;
};

export const uploadResume = async (userId, payload) => {
  const response = await apiClient.put(
    `/jobseekers/${userId}/resumes`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getSkills = async () => {
  const response = await apiClient.get(`/skills`);
  return response.data;
};

export const addSkill = async (payload) => {
  const response = await apiClient.post(`/skills`, payload);
  return response.data;
};

export const updateSkill = async (skillId, payload) => {
  const response = await apiClient.put(`/skills/${skillId}`, payload);
  return response.data;
};

export const deleteSkill = async (skillId) => {
  const response = await apiClient.delete(`/skills/${skillId}`);
  return response.data;
};
