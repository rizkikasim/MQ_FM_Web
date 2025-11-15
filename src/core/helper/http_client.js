// src/core/helper/http_client.js

import axios from "axios";
import { AuthHeader } from "./auth_header_helper";
import { API } from "../constant/api_constant";

// base axios
export const http = axios.create({
  baseURL: API.BASE_URL,
});

// inject token dan JSON
http.interceptors.request.use(
  (config) => {
    const url = config.url || "";

    config.headers = {
      ...config.headers,
      ...AuthHeader(url),  // ⬅️ FIX UTAMA
      Accept: "application/json",
    };
    return config;
  },
  (error) => Promise.reject(error)
);

