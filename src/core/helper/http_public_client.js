import axios from "axios";
import { API } from "../constant/api_constant";

export const httpPublic = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json"
  }
});