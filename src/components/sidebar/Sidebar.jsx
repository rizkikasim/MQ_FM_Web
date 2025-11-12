import React, { useState } from "react";
import { Menu, Youtube } from "lucide-react";

// === Data dummy ===
const dummyPlaylists = [
  { title: "Musik yang Disukai", subtitle: "Playlist otomatis" },
  { title: "Gg", subtitle: "arthaloka radenningrat" },
  { title: "Suara dari Shorts", subtitle: "Playlist otomatis" },
  { title: "Lofi", subtitle: "arthaloka radenningrat" },
  { title: "Episode untuk Nanti", subtitle: "Playlist otomatis" },
  { title: "Indie", subtitle: "Playlist otomatis" },
  { title: "Rock 90an", subtitle: "Playlist pengguna" },
];

// === Komponen PlaylistItem ===
const PlaylistItem = ({ title, subtitle }) => (
  <a href="#" className="flex flex-col p-2 rounded-lg hover:bg-gray-800">
    <span className="font-medium text-white truncate">{title}</span>
    <span className="text-sm text-gray-400 truncate">{subtitle}</span>
  </a>
);

// === Sidebar ===
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`h-full flex flex-col space-y-6 ${
        isExpanded
          ? "w-64 min-w-[256px] bg-black p-4"
          : "w-auto bg-transparent p-4"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center ${
          isExpanded ? "gap-3" : "justify-center"
        }`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white p-1 hover:bg-gray-800 rounded-full"
        >
          <Menu size={24} />
        </button>

        {isExpanded && (
          <div className="flex items-center gap-2 cursor-pointer">
            <Youtube size={28} className="text-red-600" />
            <span className="text-white text-2xl font-bold">Music</span>
          </div>
        )}
      </div>

      {/* Playlist Section */}
      {isExpanded && (
        <div
          className="flex-1 flex flex-col gap-2 pt-4 border-t 
            border-gray-800 overflow-y-auto"
        >
          {dummyPlaylists.map((item) => (
            <PlaylistItem
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
