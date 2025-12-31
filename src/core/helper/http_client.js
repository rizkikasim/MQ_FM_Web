import axios from "axios";
import { AuthHeader } from "./auth_header_helper";
import { API } from "../constant/api_constant";

export const http = axios.create({
  baseURL: API.BASE_URL,
});

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