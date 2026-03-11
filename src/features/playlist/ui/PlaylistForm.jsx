import { memo, useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Input, PageHeader, ErrorAlert, FormCard } from "../../../shared/ui";

const PlaylistForm = memo(({ title, initialData, isLoading, error, onSubmit }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) setName(initialData.name || "");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    onSubmit(fd);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-6">
      <PageHeader title={title} onBack={() => navigate(-1)} />
      <FormCard>
        <ErrorAlert message={error} />
        <form onSubmit={handleSubmit} className="space-y-8">
          <Input label="Playlist Name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Morning Favorites" required />
          <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate(-1)} className="px-8">Cancel</Button>
            <Button type="submit" isLoading={isLoading} icon={Save} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-8">
              {initialData ? "Update Playlist" : "Save Playlist"}
            </Button>
          </div>
        </form>
      </FormCard>
    </div>
  );
});

export default PlaylistForm;
