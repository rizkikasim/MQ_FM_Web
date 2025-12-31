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
import { useNavigate } from "react-router-dom";
import { useAdminAuthStore } from "../../logic/store/auth/useAdminAuthStore";
import { useLogoutAdminStore } from "../../logic/store/auth/useLogoutAdminStore";

const DashboardNavHeader = () => {
  const navigate = useNavigate();
  
  // Store untuk Profile Data
  const { admin, resetState } = useAdminAuthStore();
  
  // Store untuk Logout Action
  const { logoutAdmin } = useLogoutAdminStore();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    try {
      // 1. Panggil API Logout
      await logoutAdmin();
      
      // 2. Bersihkan state profile di memori
      resetState();
      
      // 3. Redirect ke login
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Jika API error, tetap paksa logout di frontend agar tidak stuck
      resetState();
      navigate("/admin/login");
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
            placeholder="Search..."
            className="w-full bg-white/10 text-white placeholder-gray-300 rounded-lg py-3 pl-12 pr-3 border border-white/20"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md text-white/85 hover:text-white hover:bg-white/10 cursor-pointer">
            <Home size={18} />
            <span className="font-medium">Home</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-md text-white/85 hover:text-white hover:bg-white/10 cursor-pointer">
            <Compass size={18} />
            <span className="font-medium">Explore</span>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <Laptop size={22} className="text-gray-300 hover:text-white cursor-pointer" />

          {/* Profile Bubble */}
          <div
            onClick={() => setOpen(!open)}
            className="w-8 h-8 bg-purple-600/80 rounded-full flex items-center justify-center 
                        text-white cursor-pointer hover:scale-105 transition shadow-lg border border-white/10"
          >
            <User size={18} />
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-12 w-48 bg-black/90 backdrop-blur-xl 
                          border border-white/10 rounded-xl shadow-xl py-2 z-50">
              
              <div className="px-4 py-2 text-xs text-gray-400 border-b border-white/10 mb-1">
                 Signed in as <br />
                 <span className="text-white font-semibold truncate block">
                    {admin?.username || "Admin"}
                 </span>
              </div>

              <button className="w-full flex items-center gap-2 px-4 py-2 text-white/90 hover:bg-white/10">
                <User size={16} /> Profile
              </button>

              <button className="w-full flex items-center gap-2 px-4 py-2 text-white/90 hover:bg-white/10">
                <Settings size={16} /> Settings
              </button>

              <div className="border-t border-white/10 my-1"></div>

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

export default DashboardNavHeader;