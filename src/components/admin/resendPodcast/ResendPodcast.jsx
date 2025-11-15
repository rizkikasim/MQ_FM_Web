import React from "react";
import { Play, Upload, Mic, ArrowUpRight } from "lucide-react";

import MockWaveform from "./MockWaveform";
import {
  transactions,
  iconMap,
  iconBgMap,
  getStatusClass,
} from "./activityConfig.jsx";

const ResendPodcast = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#111111] text-gray-300 p-6 font-sans gap-6">

      {/* ========= KIRI / MAIN ========= */}
      <div className="w-2/3 flex flex-col space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">Total Plays This Week</p>
            <h1 className="text-4xl font-bold text-white">41,812</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-green-400 font-semibold text-lg flex items-center">
              <ArrowUpRight size={18} className="mr-1" /> 4.6%
            </span>

            <div className="flex items-center gap-2 pl-4">
              <button className="p-2 bg-[#1C1C1C] rounded-lg hover:bg-gray-800 transition-colors">
                <Upload size={18} />
              </button>
              <button className="p-2 bg-[#1C1C1C] rounded-lg hover:bg-gray-800 transition-colors">
                <Mic size={18} />
              </button>
              <button className="p-2 bg-[#1C1C1C] rounded-lg hover:bg-gray-800 transition-colors">
                <Play size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* GRAPH */}
        <div className="bg-[#1C1C1C] p-6 rounded-2xl flex-grow flex flex-col">

          {/* Time Selector */}
          <div className="flex justify-end gap-1">
            {["1h", "8h", "1d", "1w", "1m", "6m", "1y"].map((v) => (
              <button
                key={v}
                className={`px-3 py-1 rounded-md text-xs font-medium
                  ${
                    v === "6m"
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Graph UI */}
          <div className="relative mt-4 flex-grow h-64 w-full">
            {/* Tooltip */}
            <div className="absolute left-[35%] top-[20%] flex flex-col items-center z-20">
              <div className="bg-[#CFFF50] text-black px-3 py-1 rounded-md text-sm font-semibold shadow-lg">
                +1,859 Plays
              </div>
              <div className="w-2 h-2 bg-[#CFFF50] transform rotate-45 -mt-1"></div>
            </div>

            {/* Yellow Line */}
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 600 250">
              <polyline
                fill="none"
                stroke="#CFFF50"
                strokeWidth="3"
                points="20,150 80,170 130,160 190,140 260,155 330,120 390,140 460,110 520,130 580,90 600,100"
              />
            </svg>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-between px-2 pb-8 opacity-40">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 bg-[#2A2A2A] rounded-t-sm"
                  style={{ height: `${Math.random() * 80 + 10}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-5">
          {[
            ["New Listeners", "+1,429", "+2.7% Today"],
            ["Drop-off Rate", "-521", "-11.8% Today"],
            ["Projected Growth", "+1,864", "+0.2% Today"],
            ["Net Change", "+495", "+11.8% Today"],
          ].map(([label, val, sub], i) => (
            <div key={i} className="bg-[#1C1C1C] p-4 rounded-xl">
              <p className="text-gray-400 text-sm">{label}</p>
              <h3 className="text-xl font-bold text-white mt-1">{val}</h3>
              <p className={`text-xs ${sub.includes("-") ? "text-red-400" : "text-green-400"} mt-1`}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========= SIDEBAR ========= */}
      <div className="w-1/3 flex flex-col space-y-6">

        {/* Risk Score */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Podcast Risk Score</h3>
            <p className="text-gray-500 text-xs">Updated: Just Now</p>
          </div>

          <div className="mt-4">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-2 bg-[#CFFF50] rounded-full" style={{ width: "66%" }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Podcast Activity</h3>
            <button className="text-xs text-[#CFFF50] font-medium hover:underline">View All</button>
          </div>

          <div className="space-y-3 overflow-y-auto">
            {transactions.map((item, i) => {
              const isHighlighted = item.status === "Failed";
              const icon = iconMap[item.type] || <Play />;
              const iconBg = iconBgMap[item.type] || "bg-gray-500";

              return (
                <div
                  key={i}
                  className={`p-4 rounded-xl flex items-center gap-4 transition-colors
                    ${isHighlighted ? "bg-[#CFFF50]" : "bg-[#2A2A2A]"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                      ${isHighlighted ? "bg-black/20" : iconBg}`}
                  >
                    {React.cloneElement(icon, {
                      className: `w-5 h-5 ${isHighlighted ? "text-black" : "text-white"}`,
                    })}
                  </div>

                  <div className="flex-grow min-w-0">
                    <p className={`font-medium ${isHighlighted ? "text-black" : "text-white"}`}>
                      {item.type}
                    </p>
                    <p className={`text-xs ${isHighlighted ? "text-black/70" : "text-gray-400"}`}>
                      {item.time}
                    </p>

                    <div className="w-full h-6 mt-1">
                      <MockWaveform
                        colorClass={isHighlighted ? "text-black/50" : "text-gray-600"}
                      />
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className={`font-medium truncate max-w-[120px] ${
                      isHighlighted ? "text-black" : "text-white"
                    }`}>
                      {item.podcast}
                    </p>
                    <p className={`text-xs ${getStatusClass(item.status, isHighlighted)}`}>
                      {item.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResendPodcast;
