import React, { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  Music,
  Upload,
  List,
  Server,
  LogOut,
  User
} from "lucide-react";
import { useAdminAuthStore } from "../../../../logic/store/auth/useAdminAuthStore";
import { useLogoutAdminStore } from "../../../../logic/store/auth/useLogoutAdminStore";
import { useNavigate, useLocation } from "react-router-dom";

import ConfirmModal from "../modal/ConfirmModal";

// === Admin Menu Data ===
const adminMenu = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />
  },
  {
    title: "Audio List",
    path: "/admin/audio",
    icon: <List size={20} />
  },
  {
    title: "Upload Audio",
    path: "/admin/audio/upload",
    icon: <Music size={20} />
  },
  {
    title: "Category List",
    path: "/admin/category",
    icon: <Server size={20} />
  },
  {
    title: "Upload Category",
    path: "/admin/category/create",
    icon: <Upload size={20} />
  },
];

// === Komponen Sidebar Item ===
const SidebarItem = ({ title, icon, path, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
      ${isActive
        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
        : "text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
  >
    <div className={`${isActive ? "text-white" : "text-gray-400"}`}>
      {icon}
    </div>
    <span className="font-medium truncate">{title}</span>
  </div>
);

// === Sidebar ===
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { admin, resetState } = useAdminAuthStore();
  const { logoutAdmin } = useLogoutAdminStore();

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

  return (
    <aside
      className={`h-full flex flex-col transition-all duration-300 border-r border-white/10 ${isExpanded
        ? "w-64 min-w-[256px] bg-black/95 backdrop-blur-xl p-4"
        : "w-20 bg-black/95 backdrop-blur-xl p-4 items-center"
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {isExpanded && (
          <div className="flex items-center gap-2">
            <span className="text-white text-xl font-bold tracking-wider">MQFM<span className="text-purple-500">Admin</span></span>
          </div>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 p-2 hover:bg-white/10 rounded-lg transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu Section */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {adminMenu.map((item) => (
          <div key={item.path} title={!isExpanded ? item.title : ""}>
            {isExpanded ? (
              <SidebarItem
                title={item.title}
                icon={item.icon}
                path={item.path}
                isActive={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ) : (
              <div
                onClick={() => navigate(item.path)}
                className={`p-3 rounded-lg flex justify-center cursor-pointer transition
                        ${location.pathname === item.path
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {item.icon}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer User Profile */}
      {isExpanded ? (
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
              {admin?.username?.charAt(0).toUpperCase() || "A"}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{admin?.username || "Admin"}</p>
              <p className="text-xs text-white/40 truncate">{admin?.email || "admin@mqfm.com"}</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="p-2 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-auto pt-4 border-t border-white/10 flex justify-center">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="p-3 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out from the admin panel?"
        confirmText="Sign Out"
        variant="danger"
      />

    </aside>
  );
};

export default Sidebar;
