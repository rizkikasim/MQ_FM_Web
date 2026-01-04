import React from "react";
import ReactDOM from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import AdminButton from "../../atoms/button/AdminButton";

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message, isDeleting }) => {
    if (!isOpen) return null;

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
                    disabled={isDeleting}
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-2">
                        <AlertTriangle size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-white">{title || "Confirm Delete"}</h3>

                    <p className="text-white/60 text-sm leading-relaxed">
                        {message || "Are you sure you want to delete this item? This action cannot be undone."}
                    </p>

                    <div className="flex gap-3 w-full mt-6">
                        <AdminButton
                            variant="outline"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="flex-1 justify-center border-white/10 hover:bg-white/5"
                        >
                            Cancel
                        </AdminButton>

                        <AdminButton
                            onClick={onConfirm}
                            isLoading={isDeleting}
                            className="flex-1 justify-center bg-red-600 hover:bg-red-700 text-white border-0"
                        >
                            Delete
                        </AdminButton>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DeleteModal;
