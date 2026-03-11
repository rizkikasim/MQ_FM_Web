import { memo, useState, useCallback } from "react";
import { Menu, LayoutDashboard, Music, Upload, List, Server, LogOut, ListMusic, Calendar, Layers } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminProfile } from "../../features/auth/model/useAdminProfile";
import { useLogoutAdmin } from "../../features/auth/model/useLogoutAdmin";
import { audioRepository } from "../../features/audio/api/audioRepository";
import { categoryRepository } from "../../features/category/api/categoryRepository";
import { playlistRepository } from "../../features/playlist/api/playlistRepository";
import { eventRepository } from "../../features/event/api/eventRepository";
import { seriesRepository } from "../../features/series/api/seriesRepository";
import { queryKeys } from "../../shared/lib/queryClient";
import { Modal, Avatar } from "../../shared/ui";
import { getDisplayName, getDisplayEmail, getInitial } from "../../entities/user";

const MENU = [
  { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, prefetch: ["audios", "categories"] },
  { title: "Audio List", path: "/admin/audio", icon: List, prefetch: ["audios", "categories"] },
  { title: "Upload Audio", path: "/admin/audio/upload", icon: Music, prefetch: ["categories"] },
  { title: "Category List", path: "/admin/category", icon: Server, prefetch: ["categories"] },
  { title: "Playlist List", path: "/admin/playlist", icon: ListMusic, prefetch: ["playlists"] },
  { title: "Event List", path: "/admin/event", icon: Calendar, prefetch: ["events"] },
  { title: "Series List", path: "/admin/series", icon: Layers, prefetch: ["series"] },
];

const prefetchMap = {
  audios: { queryKey: queryKeys.audios, queryFn: () => audioRepository.getAll().then((r) => r.data.data) },
  categories: { queryKey: queryKeys.categories, queryFn: () => categoryRepository.getAll().then((r) => r.data.data) },
  playlists: { queryKey: queryKeys.playlists, queryFn: () => playlistRepository.getAll().then((r) => r.data.data) },
  events: { queryKey: queryKeys.events, queryFn: () => eventRepository.getAll().then((r) => r.data.data) },
  series: { queryKey: queryKeys.series, queryFn: () => seriesRepository.getAll().then((r) => r.data.data) },
};

const SidebarItem = memo(({ title, icon: Icon, isActive, onClick, onMouseEnter, expanded }) => {
  if (!expanded) {
    return (
      <div
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        title={title}
        className={`p-3 rounded-lg flex justify-center cursor-pointer transition ${
          isActive ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon size={20} />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
          : "text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium truncate">{title}</span>
    </div>
  );
});

const AdminSidebar = memo(() => {
  const [expanded, setExpanded] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const qc = useQueryClient();
  const { data: admin } = useAdminProfile();
  const { logoutAdmin } = useLogoutAdmin();

  const handleLogout = useCallback(async () => {
    navigate("/admin/login");
    qc.clear();
    try { await logoutAdmin(); } catch (_) {}
  }, [logoutAdmin, qc, navigate]);

  const handlePrefetch = useCallback((keys) => {
    if (!keys) return;
    keys.forEach((k) => {
      const cfg = prefetchMap[k];
      if (cfg) qc.prefetchQuery({ ...cfg, staleTime: 1000 * 60 * 2 });
    });
  }, [qc]);

  return (
    <aside
      className={`h-full flex flex-col transition-all duration-300 border-r border-white/10 ${
        expanded ? "w-64 min-w-[256px] bg-black/95 backdrop-blur-xl p-4" : "w-20 bg-black/95 backdrop-blur-xl p-4 items-center"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        {expanded && (
          <span className="text-white text-xl font-bold tracking-wider">
            MQFM<span className="text-purple-500">Admin</span>
          </span>
        )}
        <button onClick={() => setExpanded((v) => !v)} className="text-gray-400 p-2 hover:bg-white/10 rounded-lg transition">
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {MENU.map((item) => (
          <SidebarItem
            key={item.path}
            title={item.title}
            icon={item.icon}
            isActive={pathname === item.path}
            onClick={() => navigate(item.path)}
            onMouseEnter={() => handlePrefetch(item.prefetch)}
            expanded={expanded}
          />
        ))}
      </div>

      {expanded ? (
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2">
            <Avatar name={getInitial(admin)} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{getDisplayName(admin)}</p>
              <p className="text-xs text-white/40 truncate">{getDisplayEmail(admin)}</p>
            </div>
            <button onClick={() => setLogoutOpen(true)} className="p-2 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition" title="Sign Out">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-auto pt-4 border-t border-white/10 flex justify-center">
          <button onClick={() => setLogoutOpen(true)} className="p-3 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition" title="Sign Out">
            <LogOut size={20} />
          </button>
        </div>
      )}

      <Modal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out from the admin panel?"
        confirmText="Sign Out"
        variant="danger"
      />
    </aside>
  );
});

export default AdminSidebar;
