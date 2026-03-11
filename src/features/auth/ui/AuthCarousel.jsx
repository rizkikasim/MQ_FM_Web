import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXT_VARIANTS = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -25, transition: { duration: 0.6, ease: "easeIn" } },
};

const AuthCarousel = memo(({ items, activeIndex, onDotClick }) => {
  const current = items[activeIndex];

  return (
    <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 lg:p-12 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${current.image})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/30 backdrop-blur-2xl" />

      <div className="relative z-10 w-[90%] max-w-2xl h-[85%] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] flex flex-col justify-end p-10 overflow-hidden">
        <motion.img
          key={activeIndex}
          src={current.image}
          alt="carousel"
          className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-3xl"
        />
        <div className="relative z-20 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={TEXT_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1
                className="text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: current.title }}
              />
              <p className="text-base lg:text-lg text-white/80 mb-8 max-w-md">
                {current.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative z-20 mt-6 flex items-center justify-start">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/30 shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotClick(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white/70 backdrop-blur-[2px] border border-white/50 shadow-[0_0_8px_2px_rgba(255,255,255,0.4)] scale-110"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AuthCarousel;
