// HolderStack.jsx
import React from "react";
import { motion } from "framer-motion";
import localImage from "../../assets/images/img_example_6.png"; // ← path lokal

const HamburgerIcon = () => (
  <div className="space-y-1.5 cursor-pointer">
    <span className="block w-8 h-0.5 bg-white"></span>
    <span className="block w-8 h-0.5 bg-white"></span>
    <span className="block w-8 h-0.5 bg-white"></span>
  </div>
);

const HolderStack = () => {
  return (
    <motion.div
      className="w-full py-8 md:py-12 pl-8 md:pl-12"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Grid ini sekarang akan mulai dari padding kiri dan melebar ke ujung kanan layar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* 1. Kolom Kiri - Gambar */}
        <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
          <img
            src={localImage}
            alt="Men's Collection"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* 2. Kolom Kanan - Kartu Info */}
        <div className="w-full h-[500px] md:h-[600px] bg-gray-900 text-white rounded-l-2xl p-8 md:p-12 lg:p-16 flex flex-col justify-between">
          
          {/* Konten Atas (Teks) */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              MEN'S <br />
              COLLECTION
            </h2>
            <p className="text-gray-300 max-w-md text-base leading-relaxed">
              We are proud and committed to providing quality
              clothing and accessories for the lowest prices around.
            </p>
          </div>

          {/* Konten Bawah (Tombol & Menu) */}
          <div className="flex justify-between items-center">
            <button className="bg-white text-black font-semibold py-3 px-7 rounded-full text-sm hover:bg-gray-200 transition-colors">
              Open Store
            </button>
            <HamburgerIcon />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HolderStack;
