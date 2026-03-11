import { memo, useState, useEffect, useCallback } from "react";
import { Save, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Input, FileDropzone, PageHeader, ErrorAlert, FormCard } from "../../../shared/ui";

const EventForm = memo(({ title, initialData, existingImage, isLoading, error, onSubmit }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", event_date: "", location: "" });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        event_date: initialData.event_date ? initialData.event_date.slice(0, 16) : "",
        location: initialData.location || "",
      });
    }
  }, [initialData]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", formData.title);
    const rawDate = formData.event_date.replace("T", " ");
    fd.append("event_date", rawDate.length === 16 ? rawDate + ":00" : rawDate);
    if (formData.description) fd.append("description", formData.description);
    if (formData.location) fd.append("location", formData.location);
    if (image) fd.append("image", image);
    onSubmit(fd);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-6">
      <PageHeader title={title} onBack={() => navigate(-1)} />
      <ErrorAlert message={error} />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FormCard className="h-full flex flex-col gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white/80">
              <ImageIcon size={20} className="text-blue-400" /> Event Image
            </h2>
            <FileDropzone
              file={image}
              onFileChange={handleImageChange}
              accept="image/*"
              type="image"
              label="Upload event image"
              subLabel="JPG, PNG"
              currentPreviewUrl={existingImage}
              className="flex-1 min-h-[200px]"
            />
          </FormCard>
        </div>
        <div className="lg:col-span-2">
          <FormCard className="h-full flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Event Details</h2>
              <Input label="Event Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Kajian Akbar" required />
              <Input label="Event Date" name="event_date" type="datetime-local" value={formData.event_date} onChange={handleChange} required />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Masjid Al-Ikhlas" />
              <Input label="Description" type="textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the event..." rows={5} />
            </div>
            <div className="pt-8 mt-8 border-t border-white/10 flex justify-end gap-4">
              <Button variant="outline" onClick={() => navigate(-1)} className="px-8">Cancel</Button>
              <Button type="submit" isLoading={isLoading} icon={Save} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-8">
                {initialData ? "Update Event" : "Save Event"}
              </Button>
            </div>
          </FormCard>
        </div>
      </form>
    </div>
  );
});

export default EventForm;
