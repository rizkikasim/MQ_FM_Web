import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // jika token ga ada, langsung ke login
  if (!token || token === "undefined" || token === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
