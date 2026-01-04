import React, { useState } from "react";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../templates/AdminLayout";
import AdminInput from "../../atoms/input/AdminInput";
import AdminButton from "../../atoms/button/AdminButton";
import { useCreateCategoryStore } from "../../../../logic/store/category/useCreateCategoryStore";

const CategoryCreate = () => {
  const navigate = useNavigate();
  const { createCategory, loading, error } = useCreateCategoryStore();
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(formData);
      navigate("/admin/category");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8 mt-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/50 hover:text-white transition mb-2"
            >
              <ArrowLeft size={20} /> Back to List
            </button>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Add New Category
            </h1>
          </div>
        </div>

        <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="space-y-6">
              <AdminInput
                label="Category Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Kajian Subuh"
                required
                className="text-lg"
              />

              <AdminInput
                label="Description"
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain what this category contains..."
                rows={5}
                required
              />
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
              <AdminButton
                variant="outline"
                onClick={() => navigate("/admin/category")}
                className="px-8"
              >
                Cancel
              </AdminButton>

              <AdminButton
                type="submit"
                isLoading={loading}
                icon={Save}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-8"
              >
                Save Category
              </AdminButton>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryCreate;