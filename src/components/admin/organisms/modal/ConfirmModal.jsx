import React from "react";
import ReactDOM from "react-dom";
import { AlertCircle, X } from "lucide-react";
import AdminButton from "../../atoms/button/AdminButton";

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    isLoading = false,
    variant = "danger" // danger | warning | info
}) => {
    if (!isOpen) return null;

    // Variant colors
    const colors = {
        danger: {
            iconBg: "bg-red-500/10",
            iconColor: "text-red-500",
            buttonBg: "bg-red-600 hover:bg-red-700"
        },
        warning: {
            iconBg: "bg-amber-500/10",
            iconColor: "text-amber-500",
            buttonBg: "bg-amber-600 hover:bg-amber-700"
        },
        info: {
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-500",
            buttonBg: "bg-blue-600 hover:bg-blue-700"
        }
    };

    const activeColor = colors[variant] || colors.danger;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition"
                    disabled={isLoading}
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-16 h-16 ${activeColor.iconBg} rounded-full flex items-center justify-center ${activeColor.iconColor} mb-2`}>
                        <AlertCircle size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-white">{title}</h3>

                    <p className="text-white/60 text-sm leading-relaxed">
                        {message}
                    </p>

                    <div className="flex gap-3 w-full mt-6">
                        <AdminButton
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 justify-center border-white/10 hover:bg-white/5"
                        >
                            {cancelText}
                        </AdminButton>

                        <AdminButton
                            onClick={onConfirm}
                            isLoading={isLoading}
                            className={`flex-1 justify-center ${activeColor.buttonBg} text-white border-0`}
                        >
                            {confirmText}
                        </AdminButton>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmModal;
