import React from "react";
import bgDashboard from "../../assets/images/img_bg_dashboard_2.jpg";

const DashboardAdmin = () => {
  return (
    <>
      <div className="hidden lg:flex relative flex-col h-screen text-white select-none overflow-hidden">

        {/* Background */}
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgDashboard})` }}
        />
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/92 to-black/100 backdrop-blur-[80px]" />

        {/* Admin Main Layout */}
        <main className="relative z-10 flex-1 overflow-y-auto p-6 space-y-8">

          {/* Header Admin */}
          <AdminNavHeader />

          {/* Konten Admin */}
          <div className="flex-1 space-y-6 mt-4">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-white/70 text-lg">
              Welcome Admin, manage the system here.
            </p>
          </div>

        </main>
      </div>

      {/* Mobile Block */}
      <div className="flex lg:hidden h-screen w-full items-center justify-center bg-black text-white text-center px-6">
        <p className="text-lg font-semibold leading-relaxed">
          Sorry, admin dashboard cannot be accessed on phone/tablet.
        </p>
      </div>
    </>
  );
};

export default DashboardAdmin;
