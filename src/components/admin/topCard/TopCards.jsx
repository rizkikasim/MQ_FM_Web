import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const TopCards = ({ isRecentViewed, setIsRecentViewed }) => {
  const navigate = useNavigate();
  const popularRef = useRef(null);

  const handleRecentClick = () => {
    setIsRecentViewed(true);

    setTimeout(() => {
      if (popularRef.current) {
        popularRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 150);

    navigate("/admin/podcast/recent");
  };

  const handleMostPopularClick = () => {
    navigate("/admin/podcast/most-popular");
  };

  const handleTotalPlaysClick = () => {
    navigate("/admin/podcast/total-plays");
  };

  return (
    <div className="grid grid-cols-3 gap-6">

      {/* === RECENT ACTIVITY === */}
      <div
        onClick={handleRecentClick}
        className={`
          bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl 
          cursor-pointer hover:bg-white/20 transition relative
          ${!isRecentViewed ? "animate-heartbeat" : ""}
        `}
      >
        {!isRecentViewed && (
          <span className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-300 rounded-full shadow-lg" />
        )}

        <p className="text-white/70 mb-1">Recent Activity</p>
        <h1 className="text-3xl font-bold">+125%</h1>
        <p className="text-sm text-white/50 mt-1">Compared to yesterday</p>

        {!isRecentViewed && (
          <p className="text-yellow-300 text-xs mt-3 font-medium animate-pulse">
            Tap to view required
          </p>
        )}
      </div>

      {/* === MOST POPULAR === */}
      <div
        ref={popularRef}
        onClick={handleMostPopularClick}
        className="
          bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 
          shadow-xl cursor-pointer hover:bg-white/20 transition
        "
      >
        <p className="text-white/70 mb-1">Most Popular Podcast</p>
        <h1 className="text-3xl font-bold">Youth Talks</h1>
        <p className="text-sm text-white/50 mt-1">52,310 plays this week</p>
      </div>

      {/* === TOTAL PLAYS === */}
      <div
        onClick={handleTotalPlaysClick}
        className="
          bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl 
          cursor-pointer hover:bg-white/20 transition
        "
      >
        <p className="text-white/70 mb-1">Total Plays</p>
        <h1 className="text-3xl font-bold">1.8M</h1>
        <p className="text-sm text-white/50 mt-1">All-time streaming</p>
      </div>

    </div>
  );
};

export default TopCards;
