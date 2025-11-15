import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  LogOut,
} from "lucide-react";

const SidebarAdmin = ({ isRecentViewed }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (!isRecentViewed) return; // BLOCKING CLICK
    navigate(path);
  };

  return (
    <aside className="fixed z-20 left-0 top-0 h-full w-64 
      bg-white/5 backdrop-blur-xl border-r border-white/10 
      p-6 flex flex-col shadow-2xl">

      <h2 className="text-xl font-bold mb-8 opacity-90">Admin Panel</h2>

      <div className="flex flex-col gap-3 text-white/80">

        {/* Dashboard */}
        <button
          onClick={() => handleClick("/admin/dashboard")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
            ${isRecentViewed ? "hover:bg-white/10" : ""}`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        {/* Analytics */}
        <button
          onClick={() => handleClick("/admin/dashboard")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
            ${isRecentViewed ? "hover:bg-white/10" : ""}`}
        >
          <BarChart3 size={20} />
          Analytics
        </button>

        {/* Categories */}
        <button
          onClick={() => handleClick("/admin/category/create")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
            ${isRecentViewed ? "hover:bg-white/10" : ""}`}
        >
          <FolderKanban size={20} />
          Categories
        </button>

        {/* Users */}
        <button
          onClick={() => handleClick("/admin/users")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
            ${isRecentViewed ? "hover:bg-white/10" : ""}`}
        >
          <Users size={20} />
          Users
        </button>

      </div>

      {/* LOGOUT */}
      <div className="mt-auto">
        <button
          onClick={() => handleClick("/admin/logout")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 transition
            ${isRecentViewed ? "hover:bg-red-500/10" : ""}`}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
