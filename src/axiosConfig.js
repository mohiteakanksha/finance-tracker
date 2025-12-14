// src/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://finance-tracker-v8r3.onrender.com/api",
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
