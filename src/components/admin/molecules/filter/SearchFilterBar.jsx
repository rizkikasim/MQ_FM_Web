import React from "react";
import { Search, Filter } from "lucide-react";

const SearchFilterBar = ({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
    filterValue,
    onFilterChange,
    filterOptions = [],
    className = "",
    action = null // New prop for action buttons
}) => {
    return (
        <div className={`flex flex-col md:flex-row gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md ${className}`}>
            {/* Search Input */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition"
                />
            </div>

            <div className="flex gap-4">
                {/* Filter Dropdown */}
                {filterOptions.length > 0 && (
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                            <Filter size={18} />
                        </div>
                        <select
                            value={filterValue}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className="h-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-8 text-white appearance-none focus:outline-none cursor-pointer transition"
                        >
                            {filterOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Action Button Area */}
                {action && (
                    <div className="flex-shrink-0">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchFilterBar;
