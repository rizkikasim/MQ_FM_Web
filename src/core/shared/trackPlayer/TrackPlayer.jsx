import React from "react";
import { IconsConstant } from "../../../constant/IconsConstant";
import { useBannerLandingStore } from "../../logic/landing/useBannerLandingStore";

export default function TrackPlayer() {
    const {
        progress,
        handleSeek,
        duration,
        currentTime,
        formatTime,
        audioRef,
        isPlaying,
        togglePlayPause, // ✅ ambil dari store, bukan bikin lokal
    } = useBannerLandingStore();

    const skipBack = () => {
        const audio = audioRef;
        if (audio && audio.currentTime > 10) {
            audio.currentTime -= 10;
        } else if (audio) {
            audio.currentTime = 0;
        }
    };

    const skipNext = () => {
        const audio = audioRef;
        if (audio && audio.currentTime + 10 < audio.duration) {
            audio.currentTime += 10;
        } else if (audio) {
            audio.currentTime = audio.duration;
        }
    };

    return (
        <div className="flex flex-col items-start gap-4 relative z-20 w-full max-w-sm">
            {/* Controls row */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-5">
                    {/* ⏪ Skip Back */}
                    <button
                        onClick={skipBack}
                        className="w-12 h-12 flex items-center justify-center 
                       bg-white/10 backdrop-blur-md rounded-full 
                       hover:bg-white/20 transition-transform 
                       hover:scale-110 active:scale-95"
                        title="Back 10s"
                    >
                        <img
                            src={IconsConstant.replay5}
                            alt="Back 10s"
                            className="w-8 h-8 opacity-90"
                        />
                    </button>

                    {/* ▶️ / ⏸ Play Pause — glass style */}
                    <button
                        onClick={togglePlayPause}
                        className="w-14 h-14 flex items-center justify-center 
                       bg-white/10 backdrop-blur-lg rounded-full 
                       hover:bg-white/20 transition-transform 
                       hover:scale-110 active:scale-95 shadow-lg 
                       ring-1 ring-white/30"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        <img
                            src={isPlaying ? IconsConstant.pauseIcon : IconsConstant.playIcon}
                            alt={isPlaying ? "Pause" : "Play"}
                            className="w-7 h-7 opacity-95"
                        />
                    </button>

                    {/* ⏩ Skip Next */}
                    <button
                        onClick={skipNext}
                        className="w-12 h-12 flex items-center justify-center 
                       bg-white/10 backdrop-blur-md rounded-full 
                       hover:bg-white/20 transition-transform 
                       hover:scale-110 active:scale-95"
                        title="Next 10s"
                    >
                        <img
                            src={IconsConstant.forward5}
                            alt="Next 10s"
                            className="w-8 h-8 opacity-90"
                        />
                    </button>
                </div>

                {/* Time display */}
                <div className="flex items-center gap-2 text-sm text-white/70 font-medium">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-white/40">/</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative w-full h-[6px] bg-white/25 rounded-full overflow-hidden cursor-pointer group">
                <div
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={(e) => handleSeek(e.target.value)}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
                <div
                    className="absolute h-3 w-3 bg-white rounded-full shadow-sm transform -translate-y-[3px] transition-all duration-200 group-hover:scale-125"
                    style={{ left: `calc(${progress}% - 6px)` }}
                />
            </div>
        </div>
    );
}
