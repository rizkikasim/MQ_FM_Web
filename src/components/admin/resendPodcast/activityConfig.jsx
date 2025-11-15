import { ArrowUpRight, Mic, Upload } from "lucide-react";

/* ===== DATA TRANSAKSI ===== */
export const transactions = [
  {
    type: "Upload",
    time: "09:21 AM",
    podcast: "Morning Motivation",
    status: "Pending",
  },
  {
    type: "Edit",
    time: "08:10 AM",
    podcast: "Daily Quran",
    status: "Confirmed",
  },
  {
    type: "Re-upload",
    time: "06:20 AM",
    podcast: "Youth Talks: Ep 12",
    status: "Failed",
  },
  {
    type: "Upload",
    time: "05:15 AM",
    podcast: "Tech Weekly",
    status: "Confirmed",
  },
  {
    type: "Edit",
    time: "04:02 AM",
    podcast: "History Uncovered",
    status: "Confirmed",
  },
];

/* ===== ICON MAP (AMANN KARENA JSX SUDAH DI FILE JSX) ===== */
export const iconMap = {
  Upload: <ArrowUpRight />,
  Edit: <Mic />,
  "Re-upload": <Upload />,
};

/* ===== ICON BACKGROUND MAP ===== */
export const iconBgMap = {
  Upload: "bg-orange-500",
  Edit: "bg-purple-500",
  "Re-upload": "bg-red-500",
};

/* ===== STATUS STYLE ===== */
export const getStatusClass = (status, isHighlighted) => {
  if (isHighlighted) return "text-black/70";
  if (status === "Confirmed") return "text-green-400";
  if (status === "Pending") return "text-gray-400";
  if (status === "Failed") return "text-red-400";
  return "text-gray-400";
};
