import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { API } from "../../../../core/constant/api_constant";

// Layout & Atomic Components
import AdminLayout from "../../templates/AdminLayout";
import AdminInput from "../../atoms/input/AdminInput";
import AdminSelect from "../../atoms/select/AdminSelect";
import AdminButton from "../../atoms/button/AdminButton";
import FileDropzone from "../../molecules/upload/FileDropzone";

// Store
import { useUpdateAudioStore } from "../../../../logic/store/audio/useUpdateAudioStore";
import { useGetCategoriesStore } from "../../../../logic/store/category/useGetCategoriesStore";

const AudioEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { updateAudio, loading, error } = useUpdateAudioStore();
  const { categories, getCategories } = useGetCategoriesStore();

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: ""
  });

  useEffect(() => {
    getCategories();
    if (location.state?.audio) {
      const { title, description, category_id, thumbnail } = location.state.audio;
      setFormData({
        title: title || "",
        description: description || "",
        category_id: category_id || ""
      });
      setExistingThumbnail(thumbnail);
    }
  }, [getCategories, location.state]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category_id", parseInt(formData.category_id));

    if (file) {
      data.append("audio_file", file);
    }

    if (thumbnail) {
      data.append("thumbnail_file", thumbnail);
    }

    try {
      await updateAudio(id, data);
      navigate("/admin/audio");
    } catch (err) {
      console.error(err);
    }
  };

  // Category Options
  const categoryOptions = categories.map(c => ({
    value: c.id,
    label: c.name
  }));

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition"
        >
          <ArrowLeft size={20} /> Back to List
        </button>

        <h1 className="text-3xl font-bold">Edit Audio</h1>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Dropzones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <FileDropzone
                  file={file}
                  onFileChange={handleFileChange}
                  accept="audio/*"
                  label="Current Audio Kept"
                  subLabel="Click to replace audio"
                />
              </div>
              <div>
                <FileDropzone
                  file={thumbnail}
                  onFileChange={handleThumbnailChange}
                  accept="image/*"
                  type="image"
                  label="No Cover"
                  subLabel="Click to upload"
                  currentPreviewUrl={existingThumbnail ? `${API.BASE_URL}/${existingThumbnail}` : null}
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <AdminInput
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Track Title"
                required
              />

              <AdminInput
                label="Description"
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Audio description..."
                required
              />

              <AdminSelect
                label="Category"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                options={categoryOptions}
                required
              />
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-end gap-4">
              <AdminButton
                variant="outline"
                onClick={() => navigate("/admin/audio")}
              >
                Cancel
              </AdminButton>

              <AdminButton
                type="submit"
                variant="primary" // Blue in original, but purple is admin theme. Let's stick to purple (primary) or make a blue variant if needed. Original was blue.
                isLoading={loading}
                icon={Save}
              >
                Update Audio
              </AdminButton>

            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AudioEdit;