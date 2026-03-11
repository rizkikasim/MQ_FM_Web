import { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import AudioForm from "../../features/audio/ui/AudioForm";
import { useAudioMutations } from "../../features/audio/model/useAudioMutations";
import { useCategories } from "../../features/category/model/useCategories";

const AudioUploadPage = memo(() => {
  const navigate = useNavigate();
  const { create, extractError } = useAudioMutations();
  const { data: categories = [] } = useCategories();

  const handleSubmit = useCallback(async (data) => {
    try {
      await create.mutateAsync(data);
      navigate("/admin/audio");
    } catch (_) {}
  }, [create, navigate]);

  return (
    <AdminLayout>
      <AudioForm
        title="Upload Audio Track"
        categories={categories}
        isLoading={create.isPending}
        error={extractError(create.error)}
        onSubmit={handleSubmit}
        requireFile
      />
    </AdminLayout>
  );
});

export default AudioUploadPage;
