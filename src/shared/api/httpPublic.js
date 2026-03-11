import axios from "axios";
import { API_BASE_URL } from "./config";
import { attachLogger } from "./logger";

export const httpPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
  },
});

attachLogger(httpPublic);
