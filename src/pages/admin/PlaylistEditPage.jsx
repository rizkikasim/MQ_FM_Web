import { useCallback, memo, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Plus, Trash2, Music } from "lucide-react";
import AdminLayout from "../../widgets/admin/AdminLayout";
import PlaylistForm from "../../features/playlist/ui/PlaylistForm";
import { usePlaylistMutations } from "../../features/playlist/model/usePlaylistMutations";
import { useAudios } from "../../features/audio/model/useAudios";
import { Button, Select, FormCard, ErrorAlert } from "../../shared/ui";

const PlaylistEditPage = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const playlist = state?.playlist;
  const { update, addAudio, removeAudio, extractError } = usePlaylistMutations();
  const { data: allAudios = [] } = useAudios();

  const [selectedAudioId, setSelectedAudioId] = useState("");
  const items = playlist?.items || [];

  const handleSubmit = useCallback(async (data) => {
    try {
      await update.mutateAsync({ id, data });
      navigate("/admin/playlist");
    } catch (_) {}
  }, [update, id, navigate]);

  const handleAddAudio = useCallback(async () => {
    if (!selectedAudioId) return;
    try {
      await addAudio.mutateAsync({ playlistId: Number(id), audioId: Number(selectedAudioId) });
      setSelectedAudioId("");
    } catch (_) {}
  }, [addAudio, id, selectedAudioId]);

  const handleRemoveAudio = useCallback(async (audioId) => {
    try {
      await removeAudio.mutateAsync({ playlistId: Number(id), audioId });
    } catch (_) {}
  }, [removeAudio, id]);

  const audioOptions = allAudios.map((a) => ({ value: a.audio_id, label: a.title }));

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8 mt-6">
        <PlaylistForm title="Edit Playlist" initialData={playlist} isLoading={update.isPending} error={extractError(update.error)} onSubmit={handleSubmit} />

        <FormCard>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Music size={20} className="text-purple-400" /> Manage Audio Items
          </h2>
          <ErrorAlert message={extractError(addAudio.error) || extractError(removeAudio.error)} />

          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <Select name="audio" value={selectedAudioId} onChange={(e) => setSelectedAudioId(e.target.value)} options={audioOptions} placeholder="Select audio to add..." />
            </div>
            <Button onClick={handleAddAudio} isLoading={addAudio.isPending} icon={Plus} className="whitespace-nowrap">Add</Button>
          </div>

          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.audio_id || item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Music size={16} className="text-purple-400" />
                    <span className="text-white font-medium">{item.audio?.title || item.title || `Audio #${item.audio_id || item.id}`}</span>
                  </div>
                  <button onClick={() => handleRemoveAudio(item.audio_id || item.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-center py-6">No audio items in this playlist yet.</p>
          )}
        </FormCard>
      </div>
    </AdminLayout>
  );
});

export default PlaylistEditPage;
