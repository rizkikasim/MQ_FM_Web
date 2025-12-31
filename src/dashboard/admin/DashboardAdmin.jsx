import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Music, Layers, ChevronRight, Video } from "lucide-react";
import bgDashboard from "../../assets/images/img_bg_dashboard_2.jpg";
import DashboardNavHeader from "../../components/navbar/DashboardNavHeader";
import { useAdminAuthStore } from "../../logic/store/auth/useAdminAuthStore";

const DashboardAdmin = () => {
  const { getMe, admin } = useAdminAuthStore();

  useEffect(() => {
    getMe().catch((err) => {
        console.error("Failed to fetch admin profile:", err);
    });
  }, [getMe]);

  const adminMenus = [
    {
      title: "Audio Manager",
      description: "Upload, edit, and manage audio content.",
      icon: Music,
      link: "/admin/audio",
      color: "text-purple-400"
    },
    {
      title: "Category Manager",
      description: "Create and organize audio categories/genres.",
      icon: Layers,
      link: "/admin/category",
      color: "text-blue-400"
    },
    {
      title: "Audio Video",
      description: "Manage video content and visual media.",
      icon: Video,
      link: "/admin/video",
      color: "text-red-400"
    }
  ];

  return (
    <>
      <div className="hidden lg:flex relative flex-col h-screen text-white select-none overflow-hidden">
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgDashboard})` }}
        />
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/92 to-black/100 backdrop-blur-[80px]" />

        <main className="relative z-10 flex-1 overflow-y-auto p-6 space-y-8">
          <DashboardNavHeader />

          <div className="max-w-7xl mx-auto space-y-8 mt-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-white/70 text-lg">
                Welcome, <span className="text-green-400">{admin?.username || "Admin"}</span>. Manage the system here.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminMenus.map((menu, index) => (
                <Link
                  key={index}
                  to={menu.link}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className={`p-3 w-fit rounded-xl bg-white/5 ${menu.color}`}>
                      <menu.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {menu.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-2 leading-relaxed">
                        {menu.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                    Access Menu <ChevronRight size={16} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <div className="flex lg:hidden h-screen w-full items-center justify-center bg-black text-white text-center px-6">
        <p className="text-lg font-semibold leading-relaxed">
          Sorry, admin dashboard cannot be accessed on phone/tablet.
        </p>
      </div>
    </>
  );
};

export default DashboardAdmin;