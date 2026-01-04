import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SVG Icon ---
const ArrowRightIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
        <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
        />
    </svg>
);

const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const GlobeIcon = () => <span className="font-bold text-lg">G</span>;
// --- END SVG ---

// --- animation variants ---
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
// --- end variants ---

const SectionShowedLanding = () => {
    const [isSwapped, setIsSwapped] = useState(false);
    const handleSwap = () => setIsSwapped((prev) => !prev);

    const content = isSwapped
        ? {
            title1: "Qalbu",
            title2: (
                <>
                    Reflect & <span className="italic text-lime-300">reconnect.</span>
                </>
            ),
            description:
                "Discover spiritual calm through stories, thoughts, and reminders that bring peace to your heart.",
            subText:
                "Find reflections that soothe your mind and nurture your inner peace — one thought at a time.",
            mainImage:
                "https://images.unsplash.com/photo-1542385150-166c07000e61?auto=format&fit=crop&w=800&q=80",
            thumbImage:
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
        }
        : {
            title1: "Dakwah",
            title2: (
                <>
                    Here & <span className="italic text-lime-300">always.</span>
                </>
            ),
            description:
                "A reminder for every soul — truth and kindness that stay timeless.",
            subText:
                "Walk the path of sincerity, where faith meets daily life in simple acts that last.",
            mainImage:
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
            thumbImage:
                "https://images.unsplash.com/photo-1542385150-166c07000e61?auto=format&fit=crop&w=400&q=80",
        };

    return (
        <section className="relative min-h-screen text-stone-100 p-8 md:p-12 lg:p-16 overflow-hidden">
            {/* Social Icons */}
            <motion.div
                className="hidden md:block absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
            >
                <div className="flex flex-col items-center gap-4">
                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-800 hover:bg-stone-700 transition-colors">
                        <GlobeIcon />
                    </a>
                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-300 text-black font-bold hover:bg-lime-200 transition-colors">X</a>
                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-800 hover:bg-stone-700 transition-colors font-bold">Bē</a>
                    <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-800 hover:bg-stone-700 transition-colors font-bold">f</a>
                </div>
            </motion.div>

            {/* HEADER */}
            <motion.header
                className="flex flex-col md:flex-row justify-between items-start mb-16 lg:mb-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={content.title1}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight">
                            {content.title1}
                        </h1>
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight">
                            {content.title2}
                        </h1>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={content.description}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 max-w-sm pt-4 md:pt-8 mt-4 md:mt-0"
                    >
                        <p className="text-base leading-relaxed text-stone-300">
                            {content.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </motion.header>

            {/* MAIN */}
            <motion.main
                className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 md:pr-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
            >
                {/* LEFT */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={content.subText}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-1 flex flex-col justify-between space-y-8"
                    >
                        <div>
                            <p className="text-base leading-relaxed text-stone-300 mb-6">
                                {content.subText}
                            </p>
                            <button className="flex items-center justify-center gap-2 bg-lime-300 text-black font-bold py-3 px-6 rounded-full hover:bg-lime-200 transition-colors">
                                <span>Get Started</span>
                                <ArrowRightIcon />
                            </button>
                        </div>

                        {/* VIDEO THUMBNAIL */}
                        <div
                            onClick={handleSwap}
                            className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden cursor-pointer group transition-transform"
                        >
                            <img
                                src={content.thumbImage}
                                alt="Video thumbnail"
                                className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-black backdrop-blur-sm group-hover:scale-110 transition-transform">
                                    <PlayIcon />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* MAIN IMAGE */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={content.mainImage}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="md:col-span-3 h-[600px] rounded-lg overflow-hidden"
                    >
                        <img
                            src={content.mainImage}
                            alt="Main"
                            className="w-full h-full object-cover object-center"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.main>
        </section>
    );
};

export default SectionShowedLanding;
