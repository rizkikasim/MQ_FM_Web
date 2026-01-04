
import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import AdminLayout from "../../templates/AdminLayout";
import { useUpdateCategoryStore } from "../../../../logic/store/category/useUpdateCategoryStore";

const CategoryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { updateCategory, loading, error } = useUpdateCategoryStore();

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    if (location.state?.category) {
      const { name, description } = location.state.category;
      setFormData({
        name: name || "",
        description: description || ""
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(id, formData);
      navigate("/admin/category");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition"
        >
          <ArrowLeft size={20} /> Back to List
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Edit Category</h1>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Category Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Kajian Subuh"
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Kumpulan kajian rutin setiap ba'da subuh"
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition resize-none"
                required
              />
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/category")}
                className="px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/10 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Updating...</span>
                ) : (
                  <>
                    <Save size={18} /> Update Category
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryEdit;