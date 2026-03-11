import { useState, useCallback, memo, useMemo } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import { Button, Toolbar, DataTable, Modal, ErrorAlert } from "../../shared/ui";
import { useCategories } from "../../features/category/model/useCategories";
import { useCategoryMutations } from "../../features/category/model/useCategoryMutations";
import { getCategoryImageUrl } from "../../entities/category";

const CategoryListPage = memo(() => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: loading, error: fetchError } = useCategories();
  const { remove } = useCategoryMutations();

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
    return categories.filter((item) =>
      (item.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6 mt-4">
        <ErrorAlert message={fetchError?.message} />

        <Toolbar>
          <Toolbar.Search value={search} onChange={setSearch} placeholder="Search category name..." />
          <Toolbar.Actions>
            <Button onClick={() => navigate("/admin/category/create")} icon={Plus} className="whitespace-nowrap">
              Add Category
            </Button>
          </Toolbar.Actions>
        </Toolbar>

        <DataTable colCount={4}>
          <DataTable.Head>
            <DataTable.Th>ID</DataTable.Th>
            <DataTable.Th>Image</DataTable.Th>
            <DataTable.Th>Category Name</DataTable.Th>
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
                      <img src={getCategoryImageUrl(row.image)} alt={row.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/30 text-xs">N/A</div>
                    )}
                  </DataTable.Td>
                  <DataTable.Td><span className="font-medium">{row.name}</span></DataTable.Td>
                  <DataTable.Td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => navigate(`/admin/category/edit/${row.id}`, { state: { category: row } })} className="p-2 hover:bg-white/10 rounded-lg text-blue-400">
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
              <DataTable.Empty>No categories found.</DataTable.Empty>
            )}
          </DataTable.Body>
        </DataTable>

        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title="Delete Category"
          message="This action cannot be undone. The category will be permanently removed."
          confirmText="Delete"
          isLoading={remove.isPending}
          variant="danger"
        />
      </div>
    </AdminLayout>
  );
});

export default CategoryListPage;
