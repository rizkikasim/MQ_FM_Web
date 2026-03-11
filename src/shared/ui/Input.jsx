import { memo } from "react";

const BASE = "w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition";

const Input = memo(({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  rows = 3,
  ...props
}) => (
  <div className={`space-y-2 ${className}`}>
    {label && (
      <label className="text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`${BASE} resize-none`}
        {...props}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={BASE}
        {...props}
      />
    )}
  </div>
));

export default Input;
