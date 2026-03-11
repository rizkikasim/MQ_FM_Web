import { useState, useCallback, memo, useMemo } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import { Button, Toolbar, DataTable, Modal, ErrorAlert } from "../../shared/ui";
import { useAudios } from "../../features/audio/model/useAudios";
import { useCategories } from "../../features/category/model/useCategories";
import { useAudioMutations } from "../../features/audio/model/useAudioMutations";
import { getAudioThumbnailUrl } from "../../entities/audio";
import { getCategoryName } from "../../entities/category";

const AudioListPage = memo(() => {
  const navigate = useNavigate();
  const { data: audios = [], isLoading: loading, error: fetchError } = useAudios();
  const { data: categories = [] } = useCategories();
  const { remove } = useAudioMutations();

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget);
      setDeleteTarget(null);
    } catch (_) {}
  }, [deleteTarget, remove]);

  const filtered = useMemo(() => {
    return audios.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCategory === "All" || getCategoryName(categories, item.category_id) === filterCategory;
      return matchSearch && matchCat;
    });
  }, [audios, search, filterCategory, categories]);

  const filterOptions = useMemo(() => [
    { value: "All", label: "All Categories" },
    ...categories.map((c) => ({ value: c.name, label: c.name })),
  ], [categories]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ErrorAlert message={fetchError?.message} />

        <Toolbar>
          <Toolbar.Search value={search} onChange={setSearch} placeholder="Search title..." />
          <Toolbar.Actions>
            <Toolbar.Filter value={filterCategory} onChange={setFilterCategory} options={filterOptions} />
            <Button onClick={() => navigate("/admin/audio/upload")} icon={Plus} className="whitespace-nowrap">
              Upload Audio
            </Button>
          </Toolbar.Actions>
        </Toolbar>

        <DataTable colCount={5}>
          <DataTable.Head>
            <DataTable.Th className="w-12">#</DataTable.Th>
            <DataTable.Th>Title</DataTable.Th>
            <DataTable.Th>Category</DataTable.Th>
            <DataTable.Th>Date Added</DataTable.Th>
            <DataTable.Th className="text-right">Actions</DataTable.Th>
          </DataTable.Head>
          <DataTable.Body>
            {loading ? (
              <DataTable.Loading />
            ) : filtered.length > 0 ? (
              filtered.map((row) => (
                <DataTable.Row key={row.audio_id}>
                  <DataTable.Td>
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                      {getAudioThumbnailUrl(row.thumbnail) ? (
                        <img src={getAudioThumbnailUrl(row.thumbnail)} alt="cover" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-white/30 text-xs">N/A</span>
                      )}
                    </div>
                  </DataTable.Td>
                  <DataTable.Td>
                    <div className="font-medium">{row.title}</div>
                    <div className="text-sm text-white/50 truncate max-w-xs">{row.description}</div>
                  </DataTable.Td>
                  <DataTable.Td>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                      {getCategoryName(categories, row.category_id)}
                    </span>
                  </DataTable.Td>
                  <DataTable.Td className="text-white/60">
                    {new Date(row.created_at).toLocaleDateString()}
                  </DataTable.Td>
                  <DataTable.Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/admin/audio/edit/${row.audio_id}`, { state: { audio: row } })} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-blue-400 transition">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setDeleteTarget(row.audio_id)} className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-red-400 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </DataTable.Td>
                </DataTable.Row>
              ))
            ) : (
              <DataTable.Empty>No audio tracks found.</DataTable.Empty>
            )}
          </DataTable.Body>
        </DataTable>

        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Audio Track"
          message="This action cannot be undone. The audio file will be permanently removed."
          confirmText="Delete"
          isLoading={remove.isPending}
          variant="danger"
        />
      </div>
    </AdminLayout>
  );
});

export default AudioListPage;
