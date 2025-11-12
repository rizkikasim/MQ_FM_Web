import React from "react";
import { motion } from "framer-motion";

const Episodes = () => {
  return (
    <motion.div
      className="min-h-screen text-white p-8 md:p-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <header className="flex flex-col md:flex-row justify-between items-start">
        {/* kiri atas */}
        <div className="mb-8 md:mb-0">
          <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
            REMOTE TEAMS THAT FEEL IN-HOUSE
          </p>
          <h1 className="text-5xl md:text-6xl font-bold max-w-lg">
            Your Global Team Extension Starts Here
          </h1>
        </div>

        {/* kanan atas */}
        <div className="max-w-md relative">
          <span className="text-gray-600 text-4xl font-thin absolute -top-4 -right-4">
            +
          </span>
          <p className="text-gray-300 text-lg leading-relaxed mt-12">
            We help businesses scale effortlessly by providing pre-vetted global
            talent that works of your team. Get instant access to top-tier
            developers, designers, and project managers — without the hassle of
            hiring.
          </p>
        </div>
      </header>

      {/* carousel cards */}
      <div className="relative mt-20">
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {/* card 1 */}
          <div className="flex-shrink-0 w-80 h-[500px] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=60"
              alt="Team Member"
              className="w-full h-full object-cover"
            />
          </div>

          {/* card 2 */}
          <div className="relative flex-shrink-0 w-80 h-[500px] rounded-xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf02869f0?auto=format&fit=crop&w=800&q=60"
              alt="Jessica Kim"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-500/40">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  AVAILABLE
                </span>
                <span className="text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
                  125+ Successful projects
                </span>
              </div>

              <div>
                <p className="text-xl font-medium text-white">
                  "I don't just close tasks — I move the business forward."
                </p>
                <h3 className="text-2xl font-bold text-white mt-4">
                  Jessica Kim
                </h3>
                <p className="text-gray-300">UI/UX & Product Designer</p>
                <div className="flex gap-3 mt-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/10 transition-colors font-bold text-sm"
                  >
                    in
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/10 transition-colors font-bold text-sm"
                  >
                    X
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* card 3 */}
          <div className="flex-shrink-0 w-80 h-[500px] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521119989659-a83e66886b1e?auto=format&fit=crop&w=800&q=60"
              alt="Team Member"
              className="w-full h-full object-cover"
            />
          </div>

          {/* card 4 */}
          <div className="flex-shrink-0 w-80 h-[500px] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=60"
              alt="Team Member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* footer buttons */}
      <footer className="flex justify-between items-center mt-12">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-black font-bold py-3 px-6 rounded-lg bg-green-400 hover:bg-green-300 transition-colors">
            <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
            LET'S TALK
          </button>
          <button className="text-white font-semibold py-3 px-6 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
            SEE ALL SPECIALISTS (34)
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 text-gray-400 text-sm font-semibold tracking-wider">
          <span className="border border-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-gray-400 text-sm">
            +
          </span>
          <span>SCROLL DOWN</span>
        </div>
      </footer>
    </motion.div>
  );
};

export default Episodes;
