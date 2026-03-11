import { memo } from "react";

const SkeletonList = memo(({ count = 3, height = "h-12" }) => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className={`${height} bg-white/5 rounded-xl`} />
    ))}
  </div>
));

export default SkeletonList;
