import { Navigate, Outlet } from "react-router-dom";
import { useAdminProfile } from "../features/auth/model/useAdminProfile";

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("admin_token");
  useAdminProfile();

  if (!token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

export default ProtectedAdminRoute;
