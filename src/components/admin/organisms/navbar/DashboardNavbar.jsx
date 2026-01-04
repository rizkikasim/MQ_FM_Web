import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Menu
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuthStore } from "../../../../logic/store/auth/useAdminAuthStore";
import { useLogoutAdminStore } from "../../../../logic/store/auth/useLogoutAdminStore";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Store
  const { admin, resetState } = useAdminAuthStore();
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
      await logoutAdmin();
      resetState();
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      resetState();
      navigate("/admin/login");
    }
  };

  // Helper to get page title based on path
  const getPageTitle = (pathname) => {
    if (pathname.includes("/audio")) return "Audio Manager";
    if (pathname.includes("/category")) return "Category Manager";
    if (pathname === "/admin" || pathname === "/admin/") return "Dashboard Overview";
    return "Admin Panel";
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="sticky top-0 z-40 w-full px-6 py-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">

        {/* Left: Page Title & Breadcrumb-ish context */}
        <div className="flex items-center gap-4">
          <div className="md:hidden text-white/70">
            <Menu size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{pageTitle}</h2>
            <p className="text-xs text-white/40 font-medium tracking-wide uppercase hidden md:block">
              MQFM Radio Admin
            </p>
          </div>
        </div>

        {/* Center: Global Search (Optional - can be hidden on small screens) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full bg-black/20 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:bg-black/40 focus:border-purple-500/50 transition-all placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-4 relative" ref={dropdownRef}>

          {/* Notifications */}
          <button className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a1a1a]"></span>
          </button>

          <div className="h-8 w-[1px] bg-white/10 mx-1 hidden md:block"></div>

          {/* Profile Dropdown Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/10"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-white leading-none">{admin?.username || "Admin"}</p>
              <p className="text-xs text-white/40 mt-0.5">Administrator</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <span className="font-bold text-sm">
                {admin?.username?.charAt(0).toUpperCase() || "A"}
              </span>
            </div>
            <ChevronDown size={16} className={`text-white/40 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-14 w-60 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

              <div className="px-5 py-3 border-b border-white/5">
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">Signed in as</p>
                <p className="text-white font-semibold truncate">{admin?.email || "admin@mqfm.com"}</p>
              </div>

              <div className="p-2 space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition font-medium">
                  <User size={18} /> My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition font-medium">
                  <Settings size={18} /> Account Settings
                </button>
              </div>

              <div className="h-[1px] bg-white/5 my-1 mx-2"></div>

              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition font-medium"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;