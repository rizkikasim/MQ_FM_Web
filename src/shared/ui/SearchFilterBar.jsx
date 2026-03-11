import { memo } from "react";
import { Search, Filter } from "lucide-react";

const Root = memo(({ children, className = "" }) => (
  <div className={`flex flex-col md:flex-row gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md ${className}`}>
    {children}
  </div>
));

const SearchInput = memo(({ value, onChange, placeholder = "Search...", className = "" }) => (
  <div className={`relative flex-1 ${className}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition"
    />
  </div>
));

const FilterSelect = memo(({ value, onChange, options = [], className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
      <Filter size={18} />
    </div>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-8 text-white appearance-none focus:outline-none cursor-pointer transition"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
));

const Actions = memo(({ children }) => (
  <div className="flex gap-4 flex-shrink-0">{children}</div>
));

const Toolbar = Object.assign(Root, { Search: SearchInput, Filter: FilterSelect, Actions });

export default Toolbar;
