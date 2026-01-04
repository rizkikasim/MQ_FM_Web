import React from "react";
import { Loader } from "lucide-react";

const AdminButton = ({
    children,
    onClick,
    type = "button",
    variant = "primary", // primary, secondary, danger, outline
    isLoading = false,
    disabled = false,
    icon: Icon,
    className = "",
    ...props
}) => {
    const baseStyles = "flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-purple-600 hover:bg-purple-700 text-white",
        secondary: "bg-blue-600 hover:bg-blue-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
        outline: "border border-white/10 hover:bg-white/10 text-white",
        ghost: "text-white/50 hover:text-white hover:bg-white/5"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader size={18} className="animate-spin" />
                    <span>Processing...</span>
                </>
            ) : (
                <>
                    {Icon && <Icon size={18} />}
                    {children}
                </>
            )}
        </button>
    );
};

export default AdminButton;
