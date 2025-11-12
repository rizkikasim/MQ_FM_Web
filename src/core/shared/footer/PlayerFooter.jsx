// src/core/shared/footer/PlayerFooter.jsx
import React from "react";
import {
  Pause,
  SkipBack,
  SkipForward,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Volume2,
  Shuffle,
  Repeat,
  ChevronUp,
} from "lucide-react";

const PlayerFooter = () => {
  const currentTrack = {
    title: "No Broken Hearts (feat. Nicki Minaj)",
    artist: "Bebe Rexha",
    album: "No Broken Hearts - 2016",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000485123a34a41365c1b2c4e164f9b",
    duration: "4:01",
    currentTime: "1:28",
    progressPercent: (88 / 241) * 100,
  };

  return (
    <footer className="relative w-full h-[90px] bg-[#181818] text-white px-6 py-3 z-50 border-t border-neutral-800">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 hover:h-2 transition-all group">
        <div
          className="h-full bg-pink-500 group-hover:bg-pink-400"
          style={{ width: `${currentTrack.progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between items-center h-full">
        {/* Left controls */}
        <div className="flex items-center gap-4 w-1/4">
          <SkipBack
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
            fill="currentColor"
          />
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
            <Pause size={22} fill="black" />
          </button>
          <SkipForward
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
            fill="currentColor"
          />
          <span className="text-sm text-gray-400">
            {currentTrack.currentTime} / {currentTrack.duration}
          </span>
        </div>

        {/* Center track info */}
        <div className="flex items-center gap-3 w-1/2 justify-center">
          <img
            src={currentTrack.imageUrl}
            alt={currentTrack.title}
            className="w-12 h-12 rounded"
          />
          <div>
            <h4 className="text-sm font-medium text-white truncate hover:underline cursor-pointer">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-gray-400 truncate hover:underline cursor-pointer">
              {currentTrack.artist} • {currentTrack.album}
            </p>
          </div>
          <ThumbsUp
            size={20}
            className="text-gray-400 hover:text-white cursor-pointer ml-4"
          />
          <ThumbsDown
            size={20}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <MoreHorizontal
            size={20}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
        </div>

        {/* Right controls */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <Volume2
            size={22}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <Shuffle
            size={20}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <Repeat
            size={20}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <ChevronUp
            size={22}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayerFooter;
