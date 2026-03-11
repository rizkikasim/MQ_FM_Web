import { API_BASE_URL } from "../api/config";

export const getAssetUrl = (path) => {
  if (!path) return null;
  const baseUrl = API_BASE_URL.replace(/\/api\/?$/, "");
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${baseUrl}/${cleanPath}`;
};
