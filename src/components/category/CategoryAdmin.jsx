import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, Edit, Trash2, Loader, AlertCircle } from "lucide-react";
import bgDashboard from "../../assets/images/img_bg_dashboard_2.jpg";
import DashboardNavHeader from "../navbar/DashboardNavHeader";
import { useGetCategoriesStore } from "../../logic/store/category/useGetCategoriesStore";
import { useDeleteCategoryStore } from "../../logic/store/category/useDeleteCategoryStore";

const CategoryAdmin = () => {
  const navigate = useNavigate();
  const { categories, getCategories, loading, error } = useGetCategoriesStore();
  const { deleteCategory } = useDeleteCategoryStore();
  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        getCategories();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredCategories = (categories || []).filter((item) => {
    const itemName = item?.name || ""; 
    const matchesSearch = itemName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || (item?.status && item.status === filter);
    return matchesSearch && matchesFilter;
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
              <h1 className="text-3xl font-bold">Category Manager</h1>
              <p className="text-white/60">Manage content categories here.</p>
            </div>
            <button 
              onClick={() => navigate("/admin/category/create")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition"
            >
              <Plus size={20} /> Add Category
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
                placeholder="Search category name..." 
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
                className="bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-8 text-white appearance-none focus:outline-none cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/10 text-white/70 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Category Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-white/50">
                      <div className="flex justify-center items-center gap-2">
                        <Loader className="animate-spin" size={20} /> Loading categories...
                      </div>
                    </td>
                  </tr>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((item) => (
                    <tr key={item.id || Math.random()} className="hover:bg-white/5 transition">
                      <td className="p-4 text-white/60">#{item.id}</td>
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4 text-white/60 truncate max-w-xs">{item.description || "-"}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${item.status === 'Inactive' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          {item.status || "Active"}
                        </span>
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/admin/category/edit/${item.id}`, { state: { category: item } })}
                          className="p-2 hover:bg-white/10 rounded-lg text-blue-400"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 hover:bg-white/10 rounded-lg text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-white/50">
                      {error ? "Failed to load data." : "No categories found."}
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

export default CategoryAdmin;