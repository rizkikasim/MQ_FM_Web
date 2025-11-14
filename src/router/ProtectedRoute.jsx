import { Navigate } from "react-router-dom";
import { STORAGE_KEYS } from "../core/constant/storage_constant";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
