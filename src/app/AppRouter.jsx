import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

import LandingPage from "../components/landing/pages/LandingPage";
import PlayerScreen from "../core/shared/player/PlayerScreen";

const LoginPage = lazy(() => import("../pages/admin/LoginPage"));
const RegisterPage = lazy(() => import("../pages/admin/RegisterPage"));
const DashboardPage = lazy(() => import("../pages/admin/DashboardPage"));
const AudioListPage = lazy(() => import("../pages/admin/AudioListPage"));
const AudioUploadPage = lazy(() => import("../pages/admin/AudioUploadPage"));
const AudioEditPage = lazy(() => import("../pages/admin/AudioEditPage"));
const CategoryListPage = lazy(() => import("../pages/admin/CategoryListPage"));
const CategoryCreatePage = lazy(() => import("../pages/admin/CategoryCreatePage"));
const CategoryEditPage = lazy(() => import("../pages/admin/CategoryEditPage"));
const PlaylistListPage = lazy(() => import("../pages/admin/PlaylistListPage"));
const PlaylistCreatePage = lazy(() => import("../pages/admin/PlaylistCreatePage"));
const PlaylistEditPage = lazy(() => import("../pages/admin/PlaylistEditPage"));
const EventListPage = lazy(() => import("../pages/admin/EventListPage"));
const EventCreatePage = lazy(() => import("../pages/admin/EventCreatePage"));
const EventEditPage = lazy(() => import("../pages/admin/EventEditPage"));
const SeriesListPage = lazy(() => import("../pages/admin/SeriesListPage"));
const SeriesCreatePage = lazy(() => import("../pages/admin/SeriesCreatePage"));
const SeriesEditPage = lazy(() => import("../pages/admin/SeriesEditPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const Fallback = () => (
  <div className="flex h-screen items-center justify-center bg-[#111317]">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
  </div>
);

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  return token ? <Navigate to="/admin/dashboard" replace /> : children;
};

const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/player" element={<PlayerScreen />} />

        <Route path="/admin/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/admin/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="audio" element={<AudioListPage />} />
          <Route path="audio/upload" element={<AudioUploadPage />} />
          <Route path="audio/edit/:id" element={<AudioEditPage />} />
          <Route path="category" element={<CategoryListPage />} />
          <Route path="category/create" element={<CategoryCreatePage />} />
          <Route path="category/edit/:id" element={<CategoryEditPage />} />
          <Route path="playlist" element={<PlaylistListPage />} />
          <Route path="playlist/create" element={<PlaylistCreatePage />} />
          <Route path="playlist/edit/:id" element={<PlaylistEditPage />} />
          <Route path="event" element={<EventListPage />} />
          <Route path="event/create" element={<EventCreatePage />} />
          <Route path="event/edit/:id" element={<EventEditPage />} />
          <Route path="series" element={<SeriesListPage />} />
          <Route path="series/create" element={<SeriesCreatePage />} />
          <Route path="series/edit/:id" element={<SeriesEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
