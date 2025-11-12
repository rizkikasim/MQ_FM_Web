import React, { useRef } from "react";
import { motion } from "framer-motion"; // ⬅️ tambahkan ini
import localImage from "../../assets/images/img_example_6.png"; // ← lokal image

// --- SVG Icons ---
const ArrowLeftIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
    <path
      fillRule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

const ArrowCircleRightIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-6 h-6 text-white border border-white rounded-full p-0.5"
  >
    <path
      fillRule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    />
  </svg>
);
// --- End SVG Icons ---

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
// --- END VARIANTS ---

const SliderLanding = () => {
  const scrollRef = useRef(null);
  const scrollLeft = () => scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

  return (
    <>
      <div className="min-h-screen text-white px-6 md:px-12 lg:px-20 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            className="flex flex-col justify-between h-full py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div>
              <motion.p
                className="text-xl font-serif italic mb-2 text-white/80"
                style={{ fontFamily: "Georgia, serif" }}
                variants={fadeUp}
              >
                Autumn, 2023
              </motion.p>

              <motion.h1
                className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white"
                variants={fadeUp}
              >
                NEW WOMENS <br />
                COLLECTION
              </motion.h1>

              <motion.p className="text-white/70 max-w-md mb-8" variants={fadeUp}>
                Our selection spans many disciplines so you're sure to spot something that suits your
                hobbies.
              </motion.p>

              <motion.div className="flex gap-4 mb-16" variants={fadeUp}>
                <button className="bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                  Open Store
                </button>
                <button className="border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-black transition-colors">
                  Explore More
                </button>
              </motion.div>
            </div>

            {/* SALE CARD */}
            <motion.div className="mt-8" variants={fadeUp}>
              <div className="flex items-center gap-4 bg-white/10 text-white p-4 rounded-lg max-w-xs shadow-sm border border-white/30 backdrop-blur-sm">
                <div className="flex-1">
                  <p className="text-4xl font-bold">50%</p>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <ArrowCircleRightIcon />
                    <span className="text-sm tracking-wider">SALE</span>
                  </div>
                </div>
                <img
                  src={localImage}
                  alt="Sale item"
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CAROUSEL */}
          <motion.div
            className="relative w-full overflow-visible"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto py-4 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* CARD 1 */}
              <motion.div
                className="relative flex-shrink-0 w-80 h-[600px] rounded-3xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <img
                  src={localImage}
                  alt="Local card 1"
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 bg-white text-black text-xs font-semibold py-2 px-3 rounded-full shadow-md">
                  Open Products
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="p-3 bg-black/60 backdrop-blur-md rounded-lg text-white">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">Jacket</span>
                      <span className="font-semibold bg-white/30 px-3 py-1 rounded-full text-xs">
                        60$
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Full-length leggins</span>
                      <span className="font-semibold bg-white/30 px-3 py-1 rounded-full text-xs">
                        45$
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CARD 2 */}
              <motion.div
                className="relative flex-shrink-0 w-80 h-[600px] rounded-3xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              >
                <img
                  src={localImage}
                  alt="Local card 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="p-3 bg-black/60 backdrop-blur-md rounded-lg text-white">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">Wool Jacket</span>
                      <span className="font-semibold bg-white/30 px-3 py-1 rounded-full text-xs">
                        72$
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Long Pants</span>
                      <span className="font-semibold bg-white/30 px-3 py-1 rounded-full text-xs">
                        49$
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* NAVIGATION BUTTONS */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-20 hidden lg:flex gap-2">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-white/40 transition-colors"
              >
                <ArrowLeftIcon />
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 bg-white text-black border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* inline CSS to hide scrollbar */}
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default SliderLanding;
