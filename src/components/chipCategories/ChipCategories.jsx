import React, { useEffect } from "react";
import { useUserCategoriesStore } from "../../core/logic/category/user/categories_zustand/Categories_Zustand";

const CategoryChip = ({ label }) => (
  <button
    className="flex-shrink-0 px-4 py-2 bg-[#282828]/80 text-white text-sm font-medium 
              rounded-md whitespace-nowrap hover:bg-[#3e3e3e]/90 transition-colors"
  >
    {label}
  </button>
);

const ChipCategories = () => {
  const { categories, loading, getAllCategories } = useUserCategoriesStore();

  // Ambil data kategori user saat komponen pertama kali load
  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <div
      className="flex items-center gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide scroll-smooth"
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* LOADING (placeholder chip) */}
      {loading &&
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-20 h-8 bg-[#3a3a3a] animate-pulse rounded-md"
          ></div>
        ))}

      {/* KETIKA SUKSES */}
      {!loading &&
        categories.map((cat) => (
          <CategoryChip key={cat.id} label={cat.name} />
        ))}

      {/* KALAU API KOSONG */}
      {!loading && categories.length === 0 && (
        <span className="text-sm text-gray-400">No categories available</span>
      )}
    </div>
  );
};

export default ChipCategories;
