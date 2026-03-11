import { memo, useState, useEffect, useCallback } from "react";
import { Save, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Input, FileDropzone, PageHeader, ErrorAlert, FormCard } from "../../../shared/ui";

const CategoryForm = memo(({ title, initialData, existingImage, isLoading, error, onSubmit }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData) setName(initialData.name || "");
  }, [initialData]);

  const handleImageChange = useCallback((e) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    if (image) fd.append("image", image);
    onSubmit(fd);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-6">
      <PageHeader title={title} onBack={() => navigate(-1)} />
      <FormCard>
        <ErrorAlert message={error} />
        <form onSubmit={handleSubmit} className="space-y-8">
          <Input label="Category Name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Kajian Subuh" required />
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              <ImageIcon size={16} className="inline mr-1 text-blue-400" /> Category Image
            </label>
            <FileDropzone
              file={image}
              onFileChange={handleImageChange}
              accept="image/*"
              type="image"
              label="Upload category image"
              subLabel="JPG, PNG"
              currentPreviewUrl={existingImage}
            />
          </div>
          <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate(-1)} className="px-8">Cancel</Button>
            <Button type="submit" isLoading={isLoading} icon={Save} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-8">
              {initialData ? "Update Category" : "Save Category"}
            </Button>
          </div>
        </form>
      </FormCard>
    </div>
  );
});

export default CategoryForm;
