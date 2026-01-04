import React, { useState, useEffect } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Layout & Atomic Components
import AdminLayout from "../../templates/AdminLayout";
import SearchFilterBar from "../../molecules/filter/SearchFilterBar";
import AudioListTable from "../../organisms/list/AudioListTable";
import AdminButton from "../../atoms/button/AdminButton";
import DeleteModal from "../../organisms/modal/DeleteModal";

// Store
import { useGetAudiosStore } from "../../../../logic/store/audio/useGetAudiosStore";
import { useGetCategoriesStore } from "../../../../logic/store/category/useGetCategoriesStore";
import { useDeleteAudioStore } from "../../../../logic/store/audio/useDeleteAudioStore";

const AudioAdmin = () => {
  const navigate = useNavigate();
  const { audios, getAudios, loading, error } = useGetAudiosStore();
  const { categories, getCategories } = useGetCategoriesStore();
  const { deleteAudio, loading: deleteLoading } = useDeleteAudioStore();

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAudioId, setSelectedAudioId] = useState(null);

  useEffect(() => {
    getAudios();
    getCategories();
  }, [getAudios, getCategories]);

  const openDeleteModal = (id) => {
    setSelectedAudioId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAudioId) return;
    try {
      await deleteAudio(selectedAudioId);
      await getAudios();
      setIsDeleteModalOpen(false);
      setSelectedAudioId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    navigate(`/admin/audio/edit/${item.id}`, { state: { audio: item } });
  };

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : "Unknown";
  };

  // Filter Logic
  const filteredAudios = (audios || []).filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || getCategoryName(item.category_id) === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Prepare Filter Options
  const filterOptions = [
    { value: "All", label: "All Categories" },
    ...categories.map(c => ({ value: c.name, label: c.name }))
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <span>Error loading data: {error}</span>
          </div>
        )}

        {/* Filter & Action Section (Unified) */}
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search title..."
          filterValue={filterCategory}
          onFilterChange={setFilterCategory}
          filterOptions={filterOptions}
          action={
            <AdminButton
              onClick={() => navigate("/admin/audio/upload")}
              icon={Plus}
              className="whitespace-nowrap h-full"
            >
              Upload Audio
            </AdminButton>
          }
        />

        {/* Table Section */}
        <AudioListTable
          data={filteredAudios}
          isLoading={loading}
          error={error}
          categories={categories}
          onEdit={handleEdit}
          onDelete={openDeleteModal} // Pass openDeleteModal instead of handleDelete
        />

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Audio Track"
          message="Are you sure you want to delete this audio track? This action cannot be undone."
          isDeleting={deleteLoading}
        />

      </div>
    </AdminLayout>
  );
};

export default AudioAdmin;