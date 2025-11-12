import React from "react";

const chipCategories = [
  "Bersantai",
  "Senang",
  "Pesta",
  "Perjalanan",
  "Romansa",
  "Sedih",
  "Mengisi energi",
  "Olahraga",
  "Tidur",
  "Fokus",
];

const CategoryChip = ({ label }) => (
  <button
    className="flex-shrink-0 px-4 py-2 bg-[#282828]/80 text-white text-sm font-medium 
              rounded-md whitespace-nowrap hover:bg-[#3e3e3e]/90 transition-colors"
  >
    {label}
  </button>
);

const ChipCategories = () => {
  return (
    <div
      className="flex items-center gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide scroll-smooth"
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      {chipCategories.map((category) => (
        <CategoryChip key={category} label={category} />
      ))}
    </div>
  );
};

export default ChipCategories;
