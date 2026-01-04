import axios from "axios";
import { API } from "../constant/api_constant";

export const httpAdmin = axios.create({
  baseURL: API.BASE_URL,
});

httpAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);