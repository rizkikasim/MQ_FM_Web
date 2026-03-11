import { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import SeriesForm from "../../features/series/ui/SeriesForm";
import { useSeriesMutations } from "../../features/series/model/useSeriesMutations";

const SeriesCreatePage = memo(() => {
  const navigate = useNavigate();
  const { create, extractError } = useSeriesMutations();

  const handleSubmit = useCallback(async (data) => {
    try {
      await create.mutateAsync(data);
      navigate("/admin/series");
    } catch (_) {}
  }, [create, navigate]);

  return (
    <AdminLayout>
      <SeriesForm title="Add New Series" isLoading={create.isPending} error={extractError(create.error)} onSubmit={handleSubmit} />
    </AdminLayout>
  );
});

export default SeriesCreatePage;
