import { useState, useCallback, memo, useMemo } from "react";
import { Plus, Edit, Trash2, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import { Button, Toolbar, DataTable, Modal, ErrorAlert } from "../../shared/ui";
import { useEvents } from "../../features/event/model/useEvents";
import { useEventMutations } from "../../features/event/model/useEventMutations";
import { getEventImageUrl } from "../../entities/event";

const EventListPage = memo(() => {
  const navigate = useNavigate();
  const { data: events = [], isLoading: loading, error: fetchError } = useEvents();
  const { remove } = useEventMutations();

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
    return events.filter((item) =>
      (item.title || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const formatDate = (d) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6 mt-4">
        <ErrorAlert message={fetchError?.message} />

        <Toolbar>
          <Toolbar.Search value={search} onChange={setSearch} placeholder="Search event title..." />
          <Toolbar.Actions>
            <Button onClick={() => navigate("/admin/event/create")} icon={Plus} className="whitespace-nowrap">
              Add Event
            </Button>
          </Toolbar.Actions>
        </Toolbar>

        <DataTable colCount={6}>
          <DataTable.Head>
            <DataTable.Th>ID</DataTable.Th>
            <DataTable.Th>Image</DataTable.Th>
            <DataTable.Th>Title</DataTable.Th>
            <DataTable.Th>Date</DataTable.Th>
            <DataTable.Th>Location</DataTable.Th>
            <DataTable.Th className="text-right">Actions</DataTable.Th>
          </DataTable.Head>
          <DataTable.Body>
            {loading ? (
              <DataTable.Loading />
            ) : filtered.length > 0 ? (
              filtered.map((row) => (
                <DataTable.Row key={row.id}>
                  <DataTable.Td className="text-white/60">#{row.id}</DataTable.Td>
                  <DataTable.Td>
                    {row.image ? (
                      <img src={getEventImageUrl(row.image)} alt={row.title} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/30 text-xs">N/A</div>
                    )}
                  </DataTable.Td>
                  <DataTable.Td><span className="font-medium">{row.title}</span></DataTable.Td>
                  <DataTable.Td>
                    <span className="flex items-center gap-1 text-white/60">
                      <Calendar size={14} /> {formatDate(row.event_date)}
                    </span>
                  </DataTable.Td>
                  <DataTable.Td>
                    <span className="flex items-center gap-1 text-white/60">
                      <MapPin size={14} /> {row.location || "-"}
                    </span>
                  </DataTable.Td>
                  <DataTable.Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/admin/event/edit/${row.id}`, { state: { event: row } })} className="p-2 hover:bg-white/10 rounded-lg text-blue-400">
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
              <DataTable.Empty>No events found.</DataTable.Empty>
            )}
          </DataTable.Body>
        </DataTable>

        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Event"
          message="This action cannot be undone. The event will be permanently removed."
          confirmText="Delete"
          isLoading={remove.isPending}
          variant="danger"
        />
      </div>
    </AdminLayout>
  );
});

export default EventListPage;
