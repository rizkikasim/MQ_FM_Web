import React, { useEffect } from "react";
import AdminLayout from "../templates/AdminLayout";
import { Music, Layers, BarChart3, Disc } from "lucide-react";

// Stores
import { useGetAudiosStore } from "../../../logic/store/audio/useGetAudiosStore";
import { useGetCategoriesStore } from "../../../logic/store/category/useGetCategoriesStore";

// Komponen Card Statistik
const StatCard = ({ icon: Icon, title, value, color, loading }) => (
    <div className="bg-[#1A1D24] p-6 rounded-2xl border border-white/5 flex items-center shadow-lg hover:shadow-purple-500/10 transition group relative overflow-hidden">
        <div className={`absolute -right-4 -bottom-4 opacity-5 ${color}`}>
            <Icon size={100} />
        </div>
        <div className={`p-4 rounded-xl bg-white/5 ${color} mr-4 group-hover:scale-110 transition relative z-10`}>
            <Icon size={24} />
        </div>
        <div className="relative z-10">
            <h3 className="text-white/50 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-white tracking-tight">
                {loading ? (
                    <span className="animate-pulse bg-white/10 h-9 w-20 block rounded-lg"></span>
                ) : (
                    value
                )}
            </p>
        </div>
    </div>
);

const DashboardPage = () => {
    // Stores
    const { audios, getAudios, loading: audioLoading } = useGetAudiosStore();
    const { categories, getCategories, loading: categoryLoading } = useGetCategoriesStore();

    useEffect(() => {
        getAudios();
        getCategories();
    }, [getAudios, getCategories]);

    // Data Real
    const totalAudios = audios ? audios.length : 0;
    const totalCategories = categories ? categories.length : 0;

    // Calculate Audios per Category
    const categoryDistribution = (categories || []).map(cat => {
        const count = (audios || []).filter(a => a.category_id === cat.id).length;
        const percentage = totalAudios > 0 ? Math.round((count / totalAudios) * 100) : 0;
        return { ...cat, count, percentage };
    }).sort((a, b) => b.count - a.count); // Sort by most populated

    const stats = [
        {
            icon: Music,
            title: "Total Audio Tracks",
            value: totalAudios,
            color: "text-purple-400",
            loading: audioLoading
        },
        {
            icon: Layers,
            title: "Total Categories",
            value: totalCategories,
            color: "text-pink-400",
            loading: categoryLoading
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}

                    {/* Decorative Welcome Card */}
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

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Category Distribution Widget (Replaces Storage) */}
                    <div className="bg-[#1A1D24] rounded-2xl border border-white/5 p-6 transform hover:shadow-2xl transition duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                                <Disc size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white">Content Distribution</h3>
                        </div>

                        {categoryLoading ? (
                            <div className="space-y-4 animate-pulse">
                                {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl"></div>)}
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {categoryDistribution.slice(0, 5).map((cat) => (
                                    <div key={cat.id} className="group">
                                        <div className="flex justify-between items-center mb-2 text-sm">
                                            <span className="font-medium text-white/80 group-hover:text-white transition">{cat.name}</span>
                                            <span className="text-white/40">{cat.count} tracks</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${cat.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                                {categoryDistribution.length === 0 && (
                                    <p className="text-white/30 text-center py-4">No categories found.</p>
                                )}
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t border-white/5 text-center">
                            <p className="text-xs text-white/30">Showing top categories by track count</p>
                        </div>
                    </div>

                    {/* Recent Content List (Replaces "Activity") */}
                    <div className="bg-[#1A1D24] rounded-2xl border border-white/5 p-6 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <Music size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white">Latest Uploads</h3>
                        </div>

                        <div className="space-y-3">
                            {audioLoading ? (
                                <div className="space-y-3 animate-pulse">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-white/5 rounded-xl"></div>)}
                                </div>
                            ) : (
                                (audios || []).slice(0, 5).map((audio) => (
                                    <div key={audio.id} className="flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-transparent hover:border-white/5 group">
                                        <div className="w-10 h-10 bg-black/40 rounded-lg flex items-center justify-center text-white/50 mr-4 group-hover:scale-105 transition">
                                            <Music size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-white truncate">{audio.title}</h4>
                                            <p className="text-xs text-white/40 truncate">{audio.description || "No description"}</p>
                                        </div>
                                        <div className="text-xs text-white/30 px-3 py-1 bg-black/20 rounded-lg ml-2 whitespace-nowrap">
                                            Audio #{audio.id}
                                        </div>
                                    </div>
                                ))
                            )}
                            {(audios || []).length === 0 && !audioLoading && (
                                <div className="text-center py-10 text-white/30">
                                    No audio tracks found.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
