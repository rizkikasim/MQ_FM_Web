/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imgExample6 from "../../assets/images/img_example_6.png";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-1/3 h-1/3 text-black">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const EnjoyPodcast = () => {
  const [selected, setSelected] = useState("Taubat");

  const content = {
    Taubat:
      "Kembali pada fitrah — menata hati, memohon ampun, dan melangkah dengan kesadaran baru.",
    Sidiq:
      "Kejujuran bukan sekadar berkata benar, tapi hidup selaras antara ucapan dan perbuatan.",
    Sabar:
      "Sabar bukan pasrah, tapi kekuatan diam yang menjaga hati tetap tenang di tengah badai.",
    Pemaaf:
      "Memaafkan bukan karena lupa, tapi karena memilih damai dibanding dendam.",
    Ikhlas:
      "Ikhlas itu bukan tanpa rasa, tapi menerima hasil dengan hati yang lapang dan tenang.",
    Tablig:
      "Menyampaikan kebaikan dengan tutur yang lembut dan niat yang lurus — itulah dakwah sejati.",
  };

  // animasi scroll muncul
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
    >
      {/* background */}
      <img
        src={imgExample6}
        alt="Fashion background"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-blue-900/20" />

      {/* navbar */}
      <nav className="absolute top-0 left-0 right-0 z-20 text-white p-8 md:px-12 md:py-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="#" className="text-2xl md:text-3xl font-bold tracking-tight">
              What's its
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm lg:text-base font-medium">
              {Object.keys(content).map((item) => (
                <motion.button
                  key={item}
                  onClick={() => setSelected(item)}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`transition-colors duration-200 ${
                    selected === item
                      ? "text-white font-semibold underline underline-offset-4"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
          <a
            href="#"
            className="text-sm md:text-base font-medium border border-white/50 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Let's Listen To MQFM Podcast
          </a>
        </div>
      </nav>

      {/* main content */}
      <main className="relative z-10 min-h-screen text-white">
        {/* thumbnail */}
        <div
          className="absolute top-[55%] left-8 md:left-12 -translate-y-1/2 md:top-[36%]
                     w-40 h-40 md:w-56 md:h-56 rounded-lg shadow-xl overflow-hidden"
          style={{
            backgroundImage: `url(${imgExample6})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm shadow-lg"
            >
              <PlayIcon />
            </motion.div>
          </div>
        </div>

        {/* subtitle dinamis */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 max-w-xs md:max-w-sm lg:max-w-md text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 font-medium leading-relaxed"
          >
            {content[selected]}
          </motion.p>
        </AnimatePresence>

        {/* title dinamis */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={selected + "-title"}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute -bottom-2 md:bottom-0 left-0 w-full text-center md:text-left md:left-8 
                       text-[16vw] md:text-[200px] lg:text-[290px] xl:text-[360px] 2xl:text-[450px] 4xl:text-[600px]
                       font-extrabold text-gray-100 leading-none select-none tracking-tight uppercase"
            style={{ WebkitTextStroke: '1px transparent' }}
          >
            {selected}
          </motion.h1>
        </AnimatePresence>
      </main>
    </motion.div>
  );
};

export default EnjoyPodcast;
