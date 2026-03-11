import { memo } from "react";
import { Music, Layers, BarChart3, Disc } from "lucide-react";
import AdminLayout from "../../widgets/admin/AdminLayout";
import { StatCard, SkeletonList, ProgressBar, InfoCard } from "../../shared/ui";
import { useAudios } from "../../features/audio/model/useAudios";
import { useCategories } from "../../features/category/model/useCategories";

const AudioItem = memo(({ audio }) => (
  <div className="flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-transparent hover:border-white/5 group">
    <div className="w-10 h-10 bg-black/40 rounded-lg flex items-center justify-center text-white/50 mr-4 group-hover:scale-105 transition">
      <Music size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-medium text-white truncate">{audio.title}</h4>
      <p className="text-xs text-white/40 truncate">{audio.description || "No description"}</p>
    </div>
    <div className="text-xs text-white/30 px-3 py-1 bg-black/20 rounded-lg ml-2 whitespace-nowrap">
      Audio #{audio.audio_id}
    </div>
  </div>
));

const DashboardPage = memo(() => {
  const { data: audios = [], isLoading: audioLoading } = useAudios();
  const { data: categories = [], isLoading: categoryLoading } = useCategories();

  const totalAudios = audios.length;
  const totalCategories = categories.length;

  const distribution = categories
    .map((cat) => {
      const count = audios.filter((a) => a.category_id === cat.id).length;
      return { ...cat, count, percentage: totalAudios > 0 ? Math.round((count / totalAudios) * 100) : 0 };
    })
    .sort((a, b) => b.count - a.count);

  const stats = [
    { icon: Music, title: "Total Audio Tracks", value: totalAudios, color: "text-purple-400", loading: audioLoading },
    { icon: Layers, title: "Total Categories", value: totalCategories, color: "text-pink-400", loading: categoryLoading },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => <StatCard key={s.title} {...s} />)}
          <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/10 p-6 rounded-2xl border border-white/5 flex flex-col justify-center items-start md:col-span-2 relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:opacity-20 transition duration-500">
              <BarChart3 size={120} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Welcome Back, Admin!</h3>
            <p className="text-white/60 text-sm max-w-md relative z-10">
              Manage your radio station content efficiently. Check the distribution below to see your content balance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InfoCard icon={Disc} iconColor="text-pink-400" title="Content Distribution" className="hover:shadow-2xl transition duration-300">
            {categoryLoading ? (
              <SkeletonList count={3} />
            ) : (
              <div className="space-y-5">
                {distribution.slice(0, 5).map((cat) => (
                  <ProgressBar key={cat.id} label={cat.name} value={cat.count} suffix="tracks" percentage={cat.percentage} />
                ))}
                {distribution.length === 0 && <p className="text-white/30 text-center py-4">No categories found.</p>}
              </div>
            )}
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="text-xs text-white/30">Showing top categories by track count</p>
            </div>
          </InfoCard>

          <InfoCard icon={Music} iconColor="text-purple-400" title="Latest Uploads" className="lg:col-span-2">
            <div className="space-y-3">
              {audioLoading ? (
                <SkeletonList count={4} />
              ) : (
                (audios || []).slice(0, 5).map((a) => <AudioItem key={a.audio_id} audio={a} />)
              )}
              {!audioLoading && !(audios?.length) && (
                <div className="text-center py-10 text-white/30">No audio tracks found.</div>
              )}
            </div>
          </InfoCard>
        </div>
      </div>
    </AdminLayout>
  );
});

export default DashboardPage;
