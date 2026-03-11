import { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import CategoryForm from "../../features/category/ui/CategoryForm";
import { useCategoryMutations } from "../../features/category/model/useCategoryMutations";

const CategoryCreatePage = memo(() => {
  const navigate = useNavigate();
  const { create, extractError } = useCategoryMutations();

  const handleSubmit = useCallback(async (data) => {
    try {
      await create.mutateAsync(data);
      navigate("/admin/category");
    } catch (_) {}
  }, [create, navigate]);

  return (
    <AdminLayout>
      <CategoryForm title="Add New Category" isLoading={create.isPending} error={extractError(create.error)} onSubmit={handleSubmit} />
    </AdminLayout>
  );
});

export default CategoryCreatePage;
