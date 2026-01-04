import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LandingPage from "../components/landing/pages/LandingPage";
import PlayerScreen from "../core/shared/player/playerScreen";

import ProtectedAdminRoute from "./ProtectedAdminRoute";
import RegisterAdmin from "../components/auth/admin/Register";
import LoginAdmin from "../components/auth/admin/Login";
import DashboardPage from "../components/admin/pages/DashboardPage";

import AudioAdmin from "../components/admin/pages/audio/AudioAdmin";
import AudioUpload from "../components/admin/pages/audio/AudioUpload";
import AudioEdit from "../components/admin/pages/audio/AudioEdit";

import CategoryAdmin from "../components/admin/pages/category/CategoryAdmin";
import CategoryCreate from "../components/admin/pages/category/CategoryCreate";
import CategoryEdit from "../components/admin/pages/category/CategoryEdit";


function AppRouter() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admin_token"));

  useEffect(() => {
    const sync = () => {
      setAdminToken(localStorage.getItem("admin_token"));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/player" element={<PlayerScreen />} />

        <Route path="/admin/login" element={adminToken ? <Navigate to="/admin/dashboard" replace /> : <LoginAdmin />} />
        <Route path="/admin/register" element={adminToken ? <Navigate to="/admin/dashboard" replace /> : <RegisterAdmin />} />

        <Route path="/admin/dashboard" element={<ProtectedAdminRoute><DashboardPage /></ProtectedAdminRoute>} />

        <Route path="/admin/category" element={<ProtectedAdminRoute><CategoryAdmin /></ProtectedAdminRoute>} />
        <Route path="/admin/category/create" element={<ProtectedAdminRoute><CategoryCreate /></ProtectedAdminRoute>} />
        <Route path="/admin/category/edit/:id" element={<ProtectedAdminRoute><CategoryEdit /></ProtectedAdminRoute>} />

        <Route path="/admin/audio" element={<ProtectedAdminRoute><AudioAdmin /></ProtectedAdminRoute>} />
        <Route path="/admin/audio/edit/:id" element={<ProtectedAdminRoute><AudioEdit /></ProtectedAdminRoute>} />
        <Route path="/admin/audio/upload" element={<ProtectedAdminRoute><AudioUpload /></ProtectedAdminRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;