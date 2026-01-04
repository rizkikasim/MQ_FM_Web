import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, AlertCircle, Music, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Layout & Atomic Components
import AdminLayout from "../../templates/AdminLayout";
import AdminInput from "../../atoms/input/AdminInput";
import AdminSelect from "../../atoms/select/AdminSelect";
import AdminButton from "../../atoms/button/AdminButton";
import FileDropzone from "../../molecules/upload/FileDropzone";

// Store
import { useCreateAudioStore } from "../../../../logic/store/audio/useCreateAudioStore";
import { useGetCategoriesStore } from "../../../../logic/store/category/useGetCategoriesStore";

const AudioUpload = () => {
  const navigate = useNavigate();
  const { createAudio, loading, error } = useCreateAudioStore();
  const { categories, getCategories } = useGetCategoriesStore();

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: ""
  });

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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

    if (!file) {
      alert("Please select an audio file");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category_id", parseInt(formData.category_id));
    data.append("audio_file", file);

    if (thumbnail) {
      data.append("thumbnail_file", thumbnail);
    }

    try {
      await createAudio(data);
      navigate("/admin/audio");
    } catch (err) {
      console.error(err);
    }
  };

  // Prepare Category Options
  const categoryOptions = categories.map(c => ({
    value: c.id,
    label: c.name
  }));

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 mt-6">

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
              Upload Audio Track
            </h1>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Media Uploads */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl h-full flex flex-col gap-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-white/80">
                <Music size={20} className="text-purple-400" /> Audio File
              </h2>
              <div className="flex-1">
                <FileDropzone
                  file={file}
                  onFileChange={handleFileChange}
                  accept="audio/*"
                  label="Drop audio file here"
                  subLabel="MP3, WAV, AAC"
                  className="h-full min-h-[200px]"
                />
              </div>

              <div className="border-t border-white/10 my-2"></div>

              <h2 className="text-xl font-semibold flex items-center gap-2 text-white/80">
                <ImageIcon size={20} className="text-blue-400" /> Cover Art
              </h2>
              <div>
                <FileDropzone
                  file={thumbnail}
                  onFileChange={handleThumbnailChange}
                  accept="image/*"
                  type="image"
                  label="Upload cover"
                  subLabel="JPG, PNG"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Track Details</h2>

                <div className="grid grid-cols-1 gap-6">
                  <AdminInput
                    label="Track Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Morning Motivation"
                    required
                    className="text-lg"
                  />

                  <AdminSelect
                    label="Category"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    options={categoryOptions}
                    placeholder="Select a category..."
                    required
                  />

                  <AdminInput
                    label="Description"
                    type="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add a detailed description about this track..."
                    rows={8}
                    required
                  />
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex justify-end gap-4">
                <AdminButton
                  variant="outline"
                  onClick={() => navigate("/admin/audio")}
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
                  Start Upload
                </AdminButton>
              </div>
            </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default AudioUpload;