import { memo } from "react";

const StatCard = memo(({ icon: Icon, title, value, color, loading }) => (
  <div className="bg-[#1A1D24] p-6 rounded-2xl border border-white/5 flex items-center shadow-lg hover:shadow-purple-500/10 transition group relative overflow-hidden">
    <div className={`absolute -right-4 -bottom-4 opacity-5 ${color}`}>
      <Icon size={100} />
    </div>
    <div className={`p-4 rounded-xl bg-white/5 ${color} mr-4 group-hover:scale-110 transition relative z-10`}>
      <Icon size={24} />
    </div>
    <div className="relative z-10">
      <h3 className="text-white/50 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white tracking-tight">
        {loading ? <span className="animate-pulse bg-white/10 h-9 w-20 block rounded-lg" /> : value}
      </p>
    </div>
  </div>
));

export default StatCard;
