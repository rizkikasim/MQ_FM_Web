import React, { useState, useEffect } from "react";
import { ArrowLeft, UploadCloud, Music, Save, AlertCircle, Image } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import bgDashboard from "../../assets/images/img_bg_dashboard_2.jpg";
import DashboardNavHeader from "../navbar/DashboardNavHeader";
import { useUpdateAudioStore } from "../../logic/store/audio/useUpdateAudioStore";
import { useGetCategoriesStore } from "../../logic/store/category/useGetCategoriesStore";

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
      data.append("file", file);
    }
    
    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      await updateAudio(id, data);
      navigate("/admin/audio");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="hidden lg:flex relative flex-col h-screen text-white select-none overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgDashboard})` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/92 to-black/100 backdrop-blur-[80px]" />

      <main className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6">
        <DashboardNavHeader />

        <div className="max-w-4xl mx-auto space-y-6 mt-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="md:col-span-2 w-full h-48 border-2 border-dashed border-white/20 rounded-xl bg-black/20 hover:bg-black/40 transition flex flex-col items-center justify-center cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {file ? (
                    <div className="text-center">
                        <Music size={40} className="mx-auto text-green-400 mb-2" />
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-white/50 text-sm">New file selected</p>
                    </div>
                  ) : (
                    <div className="text-center text-white/50">
                        <Music size={40} className="mx-auto mb-2 text-white/30" />
                        <p>Current Audio Kept</p>
                        <p className="text-xs mt-1">Click to replace audio</p>
                    </div>
                  )}
                </div>

                <div className="w-full h-48 border-2 border-dashed border-white/20 rounded-xl bg-black/20 hover:bg-black/40 transition flex flex-col items-center justify-center cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {thumbnail ? (
                    <div className="text-center relative w-full h-full overflow-hidden rounded-lg">
                        <img 
                          src={URL.createObjectURL(thumbnail)} 
                          alt="New Thumbnail" 
                          className="w-full h-full object-cover"
                        />
                    </div>
                  ) : existingThumbnail ? (
                    <div className="text-center relative w-full h-full overflow-hidden rounded-lg">
                        <img 
                          src={existingThumbnail} 
                          alt="Current Thumbnail" 
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition">
                            <p className="text-xs text-white">Click to change</p>
                        </div>
                    </div>
                  ) : (
                    <div className="text-center text-white/50">
                        <Image size={40} className="mx-auto mb-2" />
                        <p>No Cover</p>
                        <p className="text-xs mt-1">Click to upload</p>
                    </div>
                  )}
                </div>

              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Category</label>
                  <select 
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 cursor-pointer appearance-none"
                    required
                  >
                    <option value="">Select Category...</option>
                    {categories && categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => navigate("/admin/audio")}
                  className="px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/10 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium transition disabled:opacity-50"
                >
                  {loading ? "Updating..." : <><Save size={18} /> Update Audio</>}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AudioEdit;