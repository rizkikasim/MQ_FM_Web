import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Music, Layers, ChevronRight, Video, ListMusic, Tag } from "lucide-react";
import bgDashboard from "../../assets/images/img_bg_dashboard_2.jpg";
import DashboardNavHeader from "../../components/navbar/DashboardNavHeader";
import { useAdminAuthStore } from "../../logic/store/auth/useAdminAuthStore";
import { useGetAudiosStore } from "../../logic/store/audio/useGetAudiosStore";
import { useGetCategoriesStore } from "../../logic/store/category/useGetCategoriesStore";

const DashboardAdmin = () => {
  const { getMe, admin } = useAdminAuthStore();
  const { audios, getAudios } = useGetAudiosStore();
  const { categories, getCategories } = useGetCategoriesStore();

  useEffect(() => {
    getMe().catch((err) => {
      console.error("Failed to fetch admin profile:", err);
    });
    getAudios();
    getCategories();
  }, [getMe, getAudios, getCategories]);

  const adminMenus = [
    {
      title: "Audio Manager",
      description: "Upload, edit, and manage audio content.",
      icon: Music,
      link: "/admin/audio",
      color: "text-purple-400",
      count: audios?.length || 0,
      countLabel: "Tracks"
    },
    {
      title: "Category Manager",
      description: "Create and organize audio categories/genres.",
      icon: Layers,
      link: "/admin/category",
      color: "text-blue-400",
      count: categories?.length || 0,
      countLabel: "Categories"
    },
    {
      title: "Audio Video",
      description: "Manage video content and visual media.",
      icon: Video,
      link: "/admin/video",
      color: "text-red-400",
      count: 0,
      countLabel: "Videos"
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
                    <div className="flex justify-between items-start">
                      <div className={`p-3 w-fit rounded-xl bg-white/5 ${menu.color}`}>
                        <menu.icon size={32} />
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-bold text-white">{menu.count}</span>
                        <span className="text-xs text-white/40 uppercase tracking-wider">{menu.countLabel}</span>
                      </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <ListMusic className="text-purple-400" />
                    <h2 className="text-xl font-bold">Recent Audios</h2>
                  </div>
                  <Link to="/admin/audio" className="text-sm text-white/40 hover:text-white transition">View All</Link>
                </div>
                <div className="space-y-4">
                  {audios?.slice(0, 5).map((audio) => (
                    <div key={audio.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center overflow-hidden">
                          {audio.thumbnail ? (
                            <img src={audio.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Music size={16} className="text-white/20" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{audio.title}</p>
                          <p className="text-xs text-white/40">ID: #{audio.id}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-white/20" />
                    </div>
                  ))}
                  {(!audios || audios.length === 0) && <p className="text-sm text-white/30 text-center py-4">No audio data found.</p>}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Tag className="text-blue-400" />
                    <h2 className="text-xl font-bold">Available Categories</h2>
                  </div>
                  <Link to="/admin/category" className="text-sm text-white/40 hover:text-white transition">View All</Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {categories?.slice(0, 8).map((cat) => (
                    <div key={cat.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition">
                      <span className="text-sm font-medium">{cat.name}</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    </div>
                  ))}
                  {(!categories || categories.length === 0) && <p className="text-sm text-white/30 text-center col-span-2 py-4">No categories found.</p>}
                </div>
              </div>
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