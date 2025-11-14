import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "../home/HomePage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import DashboardUser from "../dashboard/user/DashboardUser";
import PlayerScreen from "../core/shared/player/playerScreen";

import ProtectedRoute from "./ProtectedRoute";

// 🔥 ADMIN IMPORTS
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import RegisterAdmin from "../components/auth/admin/Register";
import LoginAdmin from "../components/auth/admin/Login";
import DashboardAdmin from "../dashboard/admin/DashboardAdmin";

function AppRouter() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admin_token"));

  useEffect(() => {
    const sync = () => {
      setToken(localStorage.getItem("token"));
      setAdminToken(localStorage.getItem("admin_token"));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* ===========================
            USER ROUTES
        ============================ */}
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        <Route path="/player" element={<PlayerScreen />} />


        {/* ===========================
            ADMIN ROUTES
        ============================ */}
        <Route
          path="/admin/login"
          element={
            adminToken ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <LoginAdmin />
            )
          }
        />

        <Route
          path="/admin/register"
          element={
            adminToken ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <RegisterAdmin />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <DashboardAdmin />
            </ProtectedAdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
