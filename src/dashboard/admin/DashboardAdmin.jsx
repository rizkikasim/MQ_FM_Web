import React, { useState, useEffect, useRef } from "react";
import bgDashboard from "../../assets/images/img_bg_dashboard_2.jpg";

import AdminNavHeader from "../../components/navbar/AdminNavHeader";
import SidebarAdmin from "../../components/admin/sidebar/SidebarAdmin";
import TopCards from "../../components/admin/topCard/TopCards";
import MoneyFlowChart from "../../components/admin/moneyChart/MoneyFlowChart";
import TransactionHistory from "../../components/admin/history/TransactionHistory";
import RightPanel from "../../components/admin/rightPanel/RightPanel";

// 💥 IMPORT STORE ADMIN
import { useLoginAuthAdminStore } from "../../core/logic/auth/admin/login_auth_zustand/login_auth_zustand";

const DashboardAdmin = () => {
  const [isRecentViewed, setIsRecentViewed] = useState(false);
  const [showScrollWarning, setShowScrollWarning] = useState(false);

  const warnCooldown = useRef(false);
  const scrollHandlerRef = useRef(null);

  // 💥 AMBIL TOKEN & HYDRATED DARI ZUSTAND
  const { token, hydrated } = useLoginAuthAdminStore();

  // ==========================================
  // 🔥 FIX UTAMA — redirect hanya setelah hydrated
  // ==========================================
  useEffect(() => {
    if (!hydrated) return; // ⬅️ WAJIB, biar ga infinite loop

    if (!token) {
      window.location.href = "/admin/login";
    }
  }, [hydrated, token]);

  // ==========================================
  // LOAD recentViewed
  // ==========================================
  useEffect(() => {
    const saved = localStorage.getItem("recentViewed");
    if (saved === "true") {
      setIsRecentViewed(true);
    }
  }, []);

  // ==========================================
  // SCROLL LOCK + WARNING
  // ==========================================
  useEffect(() => {
    if (!isRecentViewed) {
      document.body.style.overflow = "hidden";

      const blockScroll = (e) => {
        e.preventDefault();

        if (!warnCooldown.current) {
          warnCooldown.current = true;
          setShowScrollWarning(true);

          setTimeout(() => {
            setShowScrollWarning(false);
            warnCooldown.current = false;
          }, 1200);
        }
      };

      scrollHandlerRef.current = blockScroll;

      document.body.addEventListener("wheel", blockScroll, { passive: false });
      document.body.addEventListener("touchmove", blockScroll, {
        passive: false,
      });
    } else {
      document.body.style.overflow = "auto";

      if (scrollHandlerRef.current) {
        document.body.removeEventListener("wheel", scrollHandlerRef.current);
        document.body.removeEventListener(
          "touchmove",
          scrollHandlerRef.current
        );
      }
    }

    return () => {
      document.body.style.overflow = "auto";

      if (scrollHandlerRef.current) {
        document.body.removeEventListener("wheel", scrollHandlerRef.current);
        document.body.removeEventListener(
          "touchmove",
          scrollHandlerRef.current
        );
      }
    };
  }, [isRecentViewed]);

  return (
    <div className="hidden lg:flex h-screen w-full text-white relative">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgDashboard})` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/90 to-black/95 backdrop-blur-[80px]" />

      <SidebarAdmin isRecentViewed={isRecentViewed} />

      <main
        className={`relative z-10 flex-1 p-8 ml-64 space-y-10 
          ${!isRecentViewed ? "overflow-hidden" : "overflow-y-auto"}`}
      >
        <AdminNavHeader />

        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-white/60 text-lg">Analytics overview & management</p>
        </div>

        <TopCards
          isRecentViewed={isRecentViewed}
          setIsRecentViewed={(v) => {
            setIsRecentViewed(v);
            localStorage.setItem("recentViewed", v ? "true" : "false");
          }}
        />

        <MoneyFlowChart />

        <TransactionHistory />
      </main>

      <RightPanel />

      {showScrollWarning && !isRecentViewed && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 
                        bg-yellow-400 text-black px-5 py-2 rounded-xl 
                        shadow-xl text-sm font-semibold animate-pulse z-[9999]">
          Wajib klik "Recent Activity" dulu!
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
