import { memo } from "react";

const Avatar = memo(({ name, size = "md", className = "" }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20 ${className}`}>
      {name?.charAt(0).toUpperCase() || "A"}
    </div>
  );
});

export default Avatar;
