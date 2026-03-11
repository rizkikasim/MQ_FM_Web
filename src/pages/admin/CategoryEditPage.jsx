import { useCallback, memo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import CategoryForm from "../../features/category/ui/CategoryForm";
import { useCategoryMutations } from "../../features/category/model/useCategoryMutations";
import { getCategoryImageUrl } from "../../entities/category";

const CategoryEditPage = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { update, extractError } = useCategoryMutations();
  const cat = state?.category;

  const handleSubmit = useCallback(async (data) => {
    try {
      await update.mutateAsync({ id, data });
      navigate("/admin/category");
    } catch (_) {}
  }, [update, id, navigate]);

  return (
    <AdminLayout>
      <CategoryForm title="Edit Category" initialData={cat} existingImage={getCategoryImageUrl(cat?.image)} isLoading={update.isPending} error={extractError(update.error)} onSubmit={handleSubmit} />
    </AdminLayout>
  );
});

export default CategoryEditPage;
