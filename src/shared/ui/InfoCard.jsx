import { memo } from "react";

const InfoCard = memo(({ icon: Icon, iconColor = "text-purple-400", title, children, className = "" }) => (
  <div className={`bg-[#1A1D24] rounded-2xl border border-white/5 p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-lg ${iconColor} ${iconColor.replace("text-", "bg-").replace(/\d00/, "500/10")}`}>
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
    {children}
  </div>
));

export default InfoCard;
