import { memo } from "react";

const ProgressBar = memo(({ label, value, suffix = "", percentage = 0 }) => (
  <div className="group">
    <div className="flex justify-between items-center mb-2 text-sm">
      <span className="font-medium text-white/80 group-hover:text-white transition">{label}</span>
      <span className="text-white/40">{value} {suffix}</span>
    </div>
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
));

export default ProgressBar;
