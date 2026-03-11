import { useCallback, memo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import AudioForm from "../../features/audio/ui/AudioForm";
import { useAudioMutations } from "../../features/audio/model/useAudioMutations";
import { useCategories } from "../../features/category/model/useCategories";
import { getAudioThumbnailUrl } from "../../entities/audio";

const AudioEditPage = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { update, extractError } = useAudioMutations();
  const { data: categories = [] } = useCategories();

  const handleSubmit = useCallback(async (data) => {
    try {
      await update.mutateAsync({ id, data });
      navigate("/admin/audio");
    } catch (_) {}
  }, [update, id, navigate]);

  const audio = state?.audio;

  return (
    <AdminLayout>
      <AudioForm
        title="Edit Audio Track"
        initialData={audio}
        existingThumbnail={audio ? getAudioThumbnailUrl(audio.thumbnail) : null}
        categories={categories}
        isLoading={update.isPending}
        error={extractError(update.error)}
        onSubmit={handleSubmit}
      />
    </AdminLayout>
  );
});

export default AudioEditPage;
