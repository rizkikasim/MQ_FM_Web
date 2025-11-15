import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Laptop,
  Home,
  Compass,
  LogOut,
  User,
  Settings,
} from "lucide-react";

import { useLoginAuthAdminStore } from "../../core/logic/auth/admin/login_auth_zustand/login_auth_zustand.js"
import { useLogoutAuthAdminStore } from "../../core/logic/auth/admin/logout_auth_zustand/logout_auth_zustand.js";
import { useNavigate } from "react-router-dom";

const AdminNavHeader = () => {
  const navigate = useNavigate();

  // ⬅️ Ambil admin profile dari login store
  const profileTheme = useLoginAuthAdminStore((state) => state.profileTheme);
  const resetLogin = useLoginAuthAdminStore((state) => state.resetState);

  const initial = profileTheme?.initial || "A";

  // ⬅️ Logout store admin
  const logoutAdmin = useLogoutAuthAdminStore((state) => state.logoutAdmin);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown ketika click di luar
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 🔥 LOGOUT ADMIN
  const handleLogout = async () => {
    try {
      await logoutAdmin();
      resetLogin();
      navigate("/admin/login", { replace: true });
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <div className="relative flex items-center w-full gap-4 px-2 py-4 pl-24">
      <div className="relative flex items-center w-full gap-4">

        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
            <Search size={18} className="text-white" />
          </div>
          <input
            type="text"
            placeholder="Search in admin panel…"
            className="w-full bg-white/10 text-white placeholder-gray-300 rounded-lg py-3 pl-12 pr-3 border border-white/20"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <a className="flex items-center gap-2 px-3 py-2 rounded-md text-white/85 hover:text-white hover:bg-white/10">
            <Home size={18} />
            <span className="font-medium">Home</span>
          </a>

          <a className="flex items-center gap-2 px-3 py-2 rounded-md text-white/85 hover:text-white hover:bg-white/10">
            <Compass size={18} />
            <span className="font-medium">Overview</span>
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <Laptop size={22} className="text-gray-300 hover:text-white cursor-pointer" />

          {/* Profile Bubble */}
          <div
            onClick={() => setOpen(!open)}
            className="w-8 h-8 bg-blue-600/80 rounded-full flex items-center justify-center 
                       font-bold text-sm text-white cursor-pointer hover:scale-105 transition"
          >
            {initial}
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-12 w-48 bg-black/90 backdrop-blur-xl 
                         border border-white/10 rounded-xl shadow-xl py-2 z-50">

              <button className="w-full flex items-center gap-2 px-4 py-2 text-white/90 hover:bg-white/10">
                <User size={16} /> Admin Profile
              </button>

              <button className="w-full flex items-center gap-2 px-4 py-2 text-white/90 hover:bg-white/10">
                <Settings size={16} /> Settings
              </button>

              <div className="border-t border-white/10 my-1"></div>

              {/* 🔥 LOGOUT ADMIN */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/10"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavHeader;
