import React from "react";

const AdminSelect = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select option...",
    required = false,
    className = "",
    ...props
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-300">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 cursor-pointer appearance-none"
                    {...props}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {/* Chevron Icon implementation could be added here via CSS or SVG if needed, but browser default is often acceptable or managed via global CSS */}
            </div>
        </div>
    );
};

export default AdminSelect;
