import React, { useState } from "react";
import { useCreateCategoriesAdminStore } from "../../../core/logic/category/admin/create_categories_zustand/Create_Categories_Zustand";

const CategoriesCreate = () => {
  const [previewImage, setPreviewImage] = useState(null);

  // FORM STATE
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // ZUSTAND STORE
  const {
    loading,
    error,
    success,
    createCategory,
    resetState,
  } = useCreateCategoriesAdminStore();

  // preview gambar lokal
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // SUBMIT DATA KE ZUSTAND
  const handleSubmit = async () => {
    if (!name || !description || !imageFile) {
      alert("Semua field wajib diisi");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageFile);

    try {
      await createCategory(formData);

      // Reset form setelah sukses
      setName("");
      setDescription("");
      setImageFile(null);
      setPreviewImage(null);

      setTimeout(() => resetState(), 2000);
    } catch (err) {
      console.log("Create category error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create New Category
          </h1>
          <p className="text-sm text-slate-400">
            Kategorikan konten biar dashboard kamu lebih teratur dan gampang dicari.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.75)]">
          <div className="space-y-6">

            {/* SUCCESS */}
            {success && (
              <div className="p-3 rounded-lg text-green-300 bg-green-500/10 border border-green-700/20 text-sm">
                Kategori berhasil dibuat 🎉
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="p-3 rounded-lg text-red-300 bg-red-500/10 border border-red-700/20 text-sm">
                {error}
              </div>
            )}

            {/* NAME */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Category Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm 
                placeholder:text-slate-500 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ex: Kisah Sahabat"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-sm 
                placeholder:text-slate-500 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Deskripsi kategori..."
                rows={4}
              ></textarea>
              <p className="text-xs text-slate-500">
                Jelaskan singkat tujuan kategori ini (opsional).
              </p>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-200">
                Category Image
              </label>

              {/* Dropzone style */}
              <label
                htmlFor="category-image"
                className="flex flex-col items-center justify-center w-full h-32 
                rounded-xl border-2 border-dashed border-white/15 bg-white/5 
                hover:border-blue-500/70 hover:bg-white/[0.08] transition cursor-pointer"
              >
                <span className="text-xs font-medium text-slate-200">
                  Click to upload image
                </span>
                <span className="mt-1 text-[11px] text-slate-500">
                  PNG, JPG • max ~2MB
                </span>
              </label>

              <input
                id="category-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {previewImage && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                    <img
                      src={previewImage}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-slate-400">
                    <p className="font-medium text-slate-200 mb-0.5">
                      Preview
                    </p>
                    <p>Pastikan gambar relevan dengan kategori.</p>
                  </div>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-2 w-full inline-flex items-center justify-center rounded-xl 
              bg-blue-600/90 py-2.5 text-sm font-semibold 
              hover:bg-blue-500 transition shadow-lg shadow-blue-900/40
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCreate;
