import { useState, useCallback, memo, useMemo } from "react";
import { Plus, Edit, Trash2, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import { Button, Toolbar, DataTable, Modal, ErrorAlert } from "../../shared/ui";
import { usePlaylists } from "../../features/playlist/model/usePlaylists";
import { usePlaylistMutations } from "../../features/playlist/model/usePlaylistMutations";

const PlaylistListPage = memo(() => {
  const navigate = useNavigate();
  const { data: playlists = [], isLoading: loading, error: fetchError } = usePlaylists();
  const { remove } = usePlaylistMutations();

  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget);
      setDeleteTarget(null);
    } catch (_) {}
  }, [deleteTarget, remove]);

  const filtered = useMemo(() => {
    return playlists.filter((item) =>
      (item.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [playlists, search]);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6 mt-4">
        <ErrorAlert message={fetchError?.message} />

        <Toolbar>
          <Toolbar.Search value={search} onChange={setSearch} placeholder="Search playlist name..." />
          <Toolbar.Actions>
            <Button onClick={() => navigate("/admin/playlist/create")} icon={Plus} className="whitespace-nowrap">
              Add Playlist
            </Button>
          </Toolbar.Actions>
        </Toolbar>

        <DataTable colCount={4}>
          <DataTable.Head>
            <DataTable.Th>ID</DataTable.Th>
            <DataTable.Th>Playlist Name</DataTable.Th>
            <DataTable.Th>Items</DataTable.Th>
            <DataTable.Th className="text-right">Actions</DataTable.Th>
          </DataTable.Head>
          <DataTable.Body>
            {loading ? (
              <DataTable.Loading />
            ) : filtered.length > 0 ? (
              filtered.map((row) => (
                <DataTable.Row key={row.id}>
                  <DataTable.Td className="text-white/60">#{row.id}</DataTable.Td>
                  <DataTable.Td><span className="font-medium">{row.name}</span></DataTable.Td>
                  <DataTable.Td>
                    <span className="flex items-center gap-1 text-white/60">
                      <Music size={14} /> {row.items?.length || 0}
                    </span>
                  </DataTable.Td>
                  <DataTable.Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/admin/playlist/edit/${row.id}`, { state: { playlist: row } })} className="p-2 hover:bg-white/10 rounded-lg text-blue-400">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setDeleteTarget(row.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </DataTable.Td>
                </DataTable.Row>
              ))
            ) : (
              <DataTable.Empty>No playlists found.</DataTable.Empty>
            )}
          </DataTable.Body>
        </DataTable>

        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Playlist"
          message="This action cannot be undone. The playlist will be permanently removed."
          confirmText="Delete"
          isLoading={remove.isPending}
          variant="danger"
        />
      </div>
    </AdminLayout>
  );
});

export default PlaylistListPage;
