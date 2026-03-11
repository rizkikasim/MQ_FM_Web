import { useCallback, memo, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Plus, Trash2, Music } from "lucide-react";
import AdminLayout from "../../widgets/admin/AdminLayout";
import SeriesForm from "../../features/series/ui/SeriesForm";
import { useSeriesMutations } from "../../features/series/model/useSeriesMutations";
import { useAudios } from "../../features/audio/model/useAudios";
import { getSeriesImageUrl } from "../../entities/series";
import { Button, Input, Select, FormCard, ErrorAlert } from "../../shared/ui";

const SeriesEditPage = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const series = state?.series;
  const { update, addItem, removeItem, extractError } = useSeriesMutations();
  const { data: allAudios = [] } = useAudios();

  const [selectedAudioId, setSelectedAudioId] = useState("");
  const [orderNum, setOrderNum] = useState("1");
  const items = series?.items || [];

  const handleSubmit = useCallback(async (data) => {
    try {
      await update.mutateAsync({ id, data });
      navigate("/admin/series");
    } catch (_) {}
  }, [update, id, navigate]);

  const handleAddItem = useCallback(async () => {
    if (!selectedAudioId) return;
    try {
      await addItem.mutateAsync({ seriesId: Number(id), audioId: Number(selectedAudioId), orderNum: Number(orderNum) });
      setSelectedAudioId("");
      setOrderNum(String(items.length + 2));
    } catch (_) {}
  }, [addItem, id, selectedAudioId, orderNum, items.length]);

  const handleRemoveItem = useCallback(async (audioId) => {
    try {
      await removeItem.mutateAsync({ seriesId: Number(id), audioId });
    } catch (_) {}
  }, [removeItem, id]);

  const audioOptions = allAudios.map((a) => ({ value: a.audio_id, label: a.title }));

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8 mt-6">
        <SeriesForm title="Edit Series" initialData={series} existingImage={getSeriesImageUrl(series?.image)} isLoading={update.isPending} error={extractError(update.error)} onSubmit={handleSubmit} />

        <FormCard>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Music size={20} className="text-purple-400" /> Manage Series Items
          </h2>
          <ErrorAlert message={extractError(addItem.error) || extractError(removeItem.error)} />

          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <Select name="audio" value={selectedAudioId} onChange={(e) => setSelectedAudioId(e.target.value)} options={audioOptions} placeholder="Select audio to add..." />
            </div>
            <div className="w-24">
              <Input name="order" type="number" value={orderNum} onChange={(e) => setOrderNum(e.target.value)} placeholder="#" min="1" />
            </div>
            <Button onClick={handleAddItem} isLoading={addItem.isPending} icon={Plus} className="whitespace-nowrap">Add</Button>
          </div>

          {items.length > 0 ? (
            <div className="space-y-2">
              {items
                .slice()
                .sort((a, b) => (a.order_num || 0) - (b.order_num || 0))
                .map((item) => (
                  <div key={item.audio_id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-sm w-8">#{item.order_num || "-"}</span>
                      <Music size={16} className="text-purple-400" />
                      <span className="text-white font-medium">{item.audio?.title || `Audio #${item.audio_id}`}</span>
                    </div>
                    <button onClick={() => handleRemoveItem(item.audio_id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-white/40 text-center py-6">No items in this series yet.</p>
          )}
        </FormCard>
      </div>
    </AdminLayout>
  );
});

export default SeriesEditPage;
