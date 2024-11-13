// src/utils/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://rico-app-backend.onrender.com", // Update to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
