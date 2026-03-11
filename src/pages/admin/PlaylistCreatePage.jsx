import { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../widgets/admin/AdminLayout";
import PlaylistForm from "../../features/playlist/ui/PlaylistForm";
import { usePlaylistMutations } from "../../features/playlist/model/usePlaylistMutations";

const PlaylistCreatePage = memo(() => {
  const navigate = useNavigate();
  const { create, extractError } = usePlaylistMutations();

  const handleSubmit = useCallback(async (data) => {
    try {
      await create.mutateAsync(data);
      navigate("/admin/playlist");
    } catch (_) {}
  }, [create, navigate]);

  return (
    <AdminLayout>
      <PlaylistForm title="Add New Playlist" isLoading={create.isPending} error={extractError(create.error)} onSubmit={handleSubmit} />
    </AdminLayout>
  );
});

export default PlaylistCreatePage;
