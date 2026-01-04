import React from "react";
import { Play, Edit, Trash2, Loader } from "lucide-react";
import { API } from "../../../../core/constant/api_constant";

const AudioListTable = ({
    data = [],
    isLoading = false,
    error = null,
    categories = [],
    onEdit,
    onDelete,
    navigate
}) => {
    // Helper to get category name
    const getCategoryName = (id) => {
        const category = categories.find((c) => c.id === id);
        return category ? category.name : "Unknown";
    };

    return (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-white/10 text-white/70 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="p-4 w-12">#</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Date Added</th>
                        <th className="p-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                    {isLoading ? (
                        <tr>
                            <td colSpan="5" className="p-8 text-center text-white/50">
                                <div className="flex justify-center items-center gap-2">
                                    <Loader className="animate-spin" size={20} /> Loading audios...
                                </div>
                            </td>
                        </tr>
                    ) : data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition group">
                                <td className="p-4">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center relative">
                                        {item.thumbnail ? (
                                            <img
                                                src={`${API.BASE_URL}/${item.thumbnail}`}
                                                alt="cover"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://placehold.co/100?text=No+Img";
                                                }}
                                            />
                                        ) : (
                                            <Play size={16} fill="currentColor" />
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="font-medium">{item.title}</div>
                                    <div className="text-sm text-white/50 truncate max-w-xs">{item.description}</div>
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                                        {getCategoryName(item.category_id)}
                                    </span>
                                </td>
                                <td className="p-4 text-white/60">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-blue-400 transition"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-red-400 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-8 text-center text-white/50">
                                {error ? "Failed to load data." : "No audio tracks found."}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AudioListTable;
