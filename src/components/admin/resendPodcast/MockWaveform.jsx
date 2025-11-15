import React from "react";

const MockWaveform = ({ colorClass = "text-gray-600" }) => (
  <svg viewBox="0 0 100 20" className={`w-full h-full ${colorClass}`} fill="none">
    <polyline
      stroke="currentColor"
      strokeWidth="2"
      points="0,10 10,8 20,12 30,10 40,9 50,11 60,15 70,10 80,8 90,12 100,10"
    />
  </svg>
);

export default MockWaveform;
