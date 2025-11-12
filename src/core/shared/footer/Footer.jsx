// Footer.jsx

import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="w-full text-white py-20 px-8 md:px-16 lg:px-24"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Bagian Atas - Judul Besar */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold text-gray-500 tracking-widest mb-4">
            HAVE A PROJECT IN MIND?
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter">
            LET'S GET STARTED
          </h1>
        </div>

        {/* Bagian Tengah - Tiga Kolom Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Kolom 1: LINKS */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-6">
              LINKS
            </h3>
            <ul className="space-y-3 font-medium">
              <li>
                <a href="#" className="hover:text-gray-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 2: SOCIAL */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-6">
              SOCIAL
            </h3>
            <ul className="space-y-3 font-medium">
              <li>
                <a href="#" className="hover:text-gray-600">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: ADDRESS */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-6">
              ADDRESS
            </h3>
            <ul className="space-y-3 font-medium">
              <li>
                <span>123 Example Street</span>
              </li>
              <li>
                <span>United States</span>
              </li>
              <li>
                <a href="mailto:" className="hover:text-gray-600">
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bagian Bawah - Garis dan Link Kecil */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex justify-center text-sm text-gray-600 space-x-6 font-medium">
            <a href="#" className="hover:text-white">
              Style Guide
            </a>
            <a href="#" className="hover:text-white">
              License
            </a>
            <a href="#" className="hover:text-white">
              Changelog
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
