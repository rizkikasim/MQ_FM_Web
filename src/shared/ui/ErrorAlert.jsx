import { memo } from "react";
import { AlertCircle } from "lucide-react";

const ErrorAlert = memo(({ message }) => {
  if (!message) return null;
  return (
    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
      <AlertCircle size={20} />
      <span>{message}</span>
    </div>
  );
});

export default ErrorAlert;
