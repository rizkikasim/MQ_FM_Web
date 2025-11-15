import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../home/HomePage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import DashboardUser from "../dashboard/user/DashboardUser";
import PlayerScreen from "../core/shared/player/playerScreen";

import ProtectedRoute from "./ProtectedRoute";

// 🔥 ADMIN
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import RegisterAdmin from "../components/auth/admin/Register";
import LoginAdmin from "../components/auth/admin/Login";
import DashboardAdmin from "../dashboard/admin/DashboardAdmin";
import CategoriesCreate from "../components/admin/categoryCreate/CategoriesCreate";
import ResendPodcast from "../components/admin/resendPodcast/ResendPodcast";

// ⭐ NEW PAGES
import MostPopularCard from "../components/admin/mostPopular/MostPopularCard";
import TotalPlays from "../components/admin/TotalPlays/TotalPlays";

// 🔥 FIX UTAMA → AMBIL TOKEN ADMIN DARI ZUSTAND PERSIST
import { getAdminToken } from "../core/helper/getAdminToken";

function AppRouter() {

  // USER TOKEN
  const token = localStorage.getItem("token");

  // ADMIN TOKEN (ANTI LOOP)
  const adminToken = getAdminToken();

  return (
    <BrowserRouter>
      <Routes>

        {/* USER ROUTES */}
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


        {/* ADMIN ROUTES */}
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

        <Route
          path="/admin/category/create"
          element={
            <ProtectedAdminRoute>
              <CategoriesCreate />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/podcast/recent"
          element={
            <ProtectedAdminRoute>
              <ResendPodcast />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/podcast/most-popular"
          element={
            <ProtectedAdminRoute>
              <MostPopularCard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/podcast/total-plays"
          element={
            <ProtectedAdminRoute>
              <TotalPlays />
            </ProtectedAdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
