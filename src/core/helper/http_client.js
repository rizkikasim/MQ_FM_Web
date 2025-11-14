import axios from "axios";
import { AuthHeader } from "./auth_header_helper";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // atau API.BASE_URL
});

// AUTO inject header token
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ...AuthHeader(),
    };
    return config;
  },
  (error) => Promise.reject(error)
);
