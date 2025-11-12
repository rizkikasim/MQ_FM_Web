// /src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardUser from "./dashboard/user/DashboardUser";
import PlayerScreen from "./core/shared/player/playerScreen"; // ✅ sesuai path lo

import "./index.css";

// 🔹 Landing Components
import NavbarHeader from "./components/navbar/NavbarHeader";
import BannerLanding from "./components/banner/BannerLanding";
import About from "./components/aboutSection/About";
import Episodes from "./components/episode/EpisodeLanding";
import EnjoyPodcast from "./components/enjoyPodcast/EnjoyPodcast";
import Footer from "./core/shared/footer/Footer";
import ShowedLanding from "./components/showed/ShowedLanding";
import BestPlaying from "./components/best/BestPlaying";
import SliderLanding from "./components/slider/SliderLanding";
import HolderStack from "./components/holder/HolderStack";
import EndLanding from "./components/endSectionLanding/EndLanding";

// 🔹 Auth Pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function HomePage() {
  return (
    <div className="relative w-full text-white font-sans">
      <NavbarHeader />
      <BannerLanding />
      <About />
      <Episodes />
      <EnjoyPodcast />

      <div className="relative">
        <ShowedLanding />
      </div>

      <BestPlaying />
      <SliderLanding />
      <HolderStack />
      <EndLanding />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Halaman utama */}
        <Route path="/" element={<HomePage />} />

        {/* ✅ Login */}
        <Route
          path="/login"
          element={
            <div className="relative w-full text-white font-sans">
              <NavbarHeader />
              <Login />
            </div>
          }
        />

        {/* ✅ Register */}
        <Route
          path="/register"
          element={
            <div className="relative w-full text-white font-sans">
              <NavbarHeader />
              <Register />
            </div>
          }
        />

        {/* ✅ Dashboard User */}
        <Route path="/dashboard" element={<DashboardUser />} />

        {/* ✅ Player Screen (lokasi fix sesuai path lo) */}
        <Route path="/player" element={<PlayerScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
