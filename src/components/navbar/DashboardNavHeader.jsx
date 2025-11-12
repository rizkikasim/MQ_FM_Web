import React from "react";
import { Search, Laptop, Home, Compass } from "lucide-react";

const DashboardNavHeader = () => {
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
            placeholder="Telusuri lagu, album, artis, podcast"
            className="w-full bg-white/10 text-white placeholder-gray-300 rounded-lg py-3 pl-12 pr-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>

        {/* Home & Explore */}
        <nav className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-white/85 hover:text-white hover:bg-white/10"
          >
            <Home size={18} />
            <span className="font-medium">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-white/85 hover:text-white hover:bg-white/10"
          >
            <Compass size={18} />
            <span className="font-medium">Explore</span>
          </a>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Laptop
            size={22}
            className="text-gray-300 hover:text-white cursor-pointer"
          />
          <div className="w-8 h-8 bg-purple-600/80 rounded-full flex items-center justify-center font-bold text-sm text-white cursor-pointer">
            U
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavHeader;
