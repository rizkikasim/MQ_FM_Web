import { memo } from "react";
import ReactDOM from "react-dom";
import { AlertCircle, AlertTriangle, X } from "lucide-react";
import Button from "./Button";

const STYLES = {
  danger: { Icon: AlertTriangle, bg: "bg-red-500/10", color: "text-red-500", btn: "bg-red-600 hover:bg-red-700" },
  warning: { Icon: AlertCircle, bg: "bg-amber-500/10", color: "text-amber-500", btn: "bg-amber-600 hover:bg-amber-700" },
  info: { Icon: AlertCircle, bg: "bg-blue-500/10", color: "text-blue-500", btn: "bg-blue-600 hover:bg-blue-700" },
};

const Modal = memo(({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "danger",
}) => {
  if (!isOpen) return null;

  const style = STYLES[variant] || STYLES.danger;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition"
          disabled={isLoading}
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 ${style.bg} rounded-full flex items-center justify-center ${style.color} mb-2`}>
            <style.Icon size={32} />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{message}</p>
          <div className="flex gap-3 w-full mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 justify-center border-white/10 hover:bg-white/5"
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              isLoading={isLoading}
              className={`flex-1 justify-center ${style.btn} text-white border-0`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

export default Modal;
