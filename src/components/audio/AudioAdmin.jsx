import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, Play, MoreVertical, Loader, AlertCircle, Trash2, Edit } from "lucide-react";
import bgDashboard from "../../assets/images/img_bg_dashboard_2.jpg";
import DashboardNavHeader from "../navbar/DashboardNavHeader";
import { useGetAudiosStore } from "../../logic/store/audio/useGetAudiosStore";
import { useGetCategoriesStore } from "../../logic/store/category/useGetCategoriesStore";
import { useDeleteAudioStore } from "../../logic/store/audio/useDeleteAudioStore";

const AudioAdmin = () => {
  const navigate = useNavigate();
  const { audios, getAudios, loading, error } = useGetAudiosStore();
  const { categories, getCategories } = useGetCategoriesStore();
  const { deleteAudio } = useDeleteAudioStore();
  
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    getAudios();
    getCategories();
  }, [getAudios, getCategories]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this audio track?")) {
      try {
        await deleteAudio(id);
        getAudios();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : "Unknown";
  };

  const filteredAudios = (audios || []).filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || getCategoryName(item.category_id) === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="hidden lg:flex relative flex-col h-screen text-white select-none overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgDashboard})` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/92 to-black/100 backdrop-blur-[80px]" />

      <main className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6">
        <DashboardNavHeader />

        <div className="max-w-7xl mx-auto space-y-6 mt-4">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Audio Manager</h1>
              <p className="text-white/60">Upload and manage audio tracks.</p>
            </div>
            <button 
              onClick={() => navigate("/admin/audio/upload")}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition"
            >
              <Plus size={20} /> Upload Audio
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
                <AlertCircle size={20} />
                <span>Error loading data: {error}</span>
            </div>
          )}

          <div className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input 
                type="text" 
                placeholder="Search title..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
             <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                <Filter size={18} />
              </div>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-8 text-white appearance-none focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/10 text-white/70 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4 w-12">#</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date Added</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                   <tr>
                    <td colSpan="5" className="p-8 text-center text-white/50">
                      <div className="flex justify-center items-center gap-2">
                        <Loader className="animate-spin" size={20} /> Loading audios...
                      </div>
                    </td>
                  </tr>
                ) : filteredAudios.length > 0 ? (
                  filteredAudios.map((item, index) => (
                    <tr key={item.id} className="hover:bg-white/5 transition group">
                      <td className="p-4">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center relative">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt="cover" className="w-full h-full object-cover" />
                          ) : (
                            <Play size={16} fill="currentColor" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-white/50 truncate max-w-xs">{item.description}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                          {getCategoryName(item.category_id)}
                        </span>
                      </td>
                      <td className="p-4 text-white/60">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                          <button 
                            onClick={() => navigate(`/admin/audio/edit/${item.id}`, { state: { audio: item } })}
                            className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-blue-400 transition"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-red-400 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-white/50">
                      {error ? "Failed to load data." : "No audio tracks found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AudioAdmin;