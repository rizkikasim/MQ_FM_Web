import { memo, useState, useEffect, useCallback } from "react";
import { Save, Music, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, FileDropzone, PageHeader, ErrorAlert, FormCard } from "../../../shared/ui";

const AudioForm = memo(({
  title,
  initialData,
  existingThumbnail,
  categories,
  isLoading,
  error,
  onSubmit,
  requireFile = false,
}) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [formData, setFormData] = useState({ title: "", artist: "", description: "", category_id: "", status: "active" });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        artist: initialData.artist || "",
        description: initialData.description || "",
        category_id: initialData.category_id || "",
        status: initialData.status || "active",
      });
    }
  }, [initialData]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  }, []);

  const handleThumbnailChange = useCallback((e) => {
    if (e.target.files?.[0]) setThumbnail(e.target.files[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (requireFile && !file) return;
    const data = new FormData();
    data.append("title", formData.title);
    data.append("artist", formData.artist);
    data.append("description", formData.description);
    data.append("category_id", String(parseInt(formData.category_id)));
    data.append("status", formData.status);
    if (file) data.append("file", file);
    if (thumbnail) data.append("thumbnail", thumbnail);
    onSubmit(data);
  };

  const categoryOptions = (categories || []).map((c) => ({ value: c.id, label: c.name }));

  return (
    <div className="max-w-7xl mx-auto space-y-8 mt-6">
      <PageHeader title={title} onBack={() => navigate(-1)} />
      <ErrorAlert message={error} />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <FormCard className="h-full flex flex-col gap-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white/80">
              <Music size={20} className="text-purple-400" /> Audio File
            </h2>
            <FileDropzone
              file={file}
              onFileChange={handleFileChange}
              accept="audio/*"
              label="Drop audio file here"
              subLabel="MP3, WAV, AAC"
              className="flex-1 min-h-[200px]"
            />
            <div className="border-t border-white/10 my-2" />
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white/80">
              <ImageIcon size={20} className="text-blue-400" /> Cover Art
            </h2>
            <FileDropzone
              file={thumbnail}
              onFileChange={handleThumbnailChange}
              accept="image/*"
              type="image"
              label="Upload cover"
              subLabel="JPG, PNG"
              currentPreviewUrl={existingThumbnail}
            />
          </FormCard>
        </div>
        <div className="lg:col-span-2">
          <FormCard className="h-full flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Track Details</h2>
              <Input label="Track Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Morning Motivation" required />
              <Input label="Artist" name="artist" value={formData.artist} onChange={handleChange} placeholder="e.g. Syaikh Hudhaify" required />
              <Select label="Category" name="category_id" value={formData.category_id} onChange={handleChange} options={categoryOptions} placeholder="Select a category..." required />
              <Select label="Status" name="status" value={formData.status} onChange={handleChange} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} required />
              <Input label="Description" type="textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Add a detailed description..." rows={6} />
            </div>
            <div className="pt-8 mt-8 border-t border-white/10 flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate(-1)} className="px-8">Cancel</Button>
              <Button type="submit" isLoading={isLoading} icon={Save} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-8">
                {initialData ? "Update Audio" : "Start Upload"}
              </Button>
            </div>
          </FormCard>
        </div>
      </form>
    </div>
  );
});

export default AudioForm;
