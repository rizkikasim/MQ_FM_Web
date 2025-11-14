import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem("admin_token"); // bebas mau ganti

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
