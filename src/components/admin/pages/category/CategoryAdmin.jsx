
import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Loader, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../templates/AdminLayout";
import SearchFilterBar from "../../molecules/filter/SearchFilterBar";
import DeleteModal from "../../organisms/modal/DeleteModal";
import { useGetCategoriesStore } from "../../../../logic/store/category/useGetCategoriesStore";
import { useDeleteCategoryStore } from "../../../../logic/store/category/useDeleteCategoryStore";

const CategoryAdmin = () => {
  const navigate = useNavigate();
  const { categories, getCategories, loading, error } = useGetCategoriesStore();
  const { deleteCategory, loading: deleteLoading } = useDeleteCategoryStore();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const openDeleteModal = (id) => {
    setSelectedCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategoryId) return;
    try {
      await deleteCategory(selectedCategoryId);
      await getCategories();
      setIsDeleteModalOpen(false);
      setSelectedCategoryId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCategories = (categories || []).filter((item) => {
    const itemName = item?.name || "";
    const matchesSearch = itemName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || (item?.status && item.status === filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6 mt-4">

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <span>Error loading data: {error}</span>
          </div>
        )}

        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search category name..."
          filterValue={filter}
          onFilterChange={setFilter}
          filterOptions={[
            { value: "All", label: "All Status" },
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
          action={
            <button
              onClick={() => navigate("/admin/category/create")}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition h-full whitespace-nowrap text-white"
            >
              <Plus size={20} /> Add Category
            </button>
          }
        />

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
                      <span className={`px-2 py-1 rounded text-xs ${item.status === 'Inactive' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'} `}>
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
                        onClick={() => openDeleteModal(item.id)}
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

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Category"
          message="Are you sure you want to delete this category? This action cannot be undone."
          isDeleting={deleteLoading}
        />

      </div>
    </AdminLayout>
  );
};

export default CategoryAdmin;