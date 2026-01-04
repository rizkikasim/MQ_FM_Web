import React from "react";
import { motion } from "framer-motion";

// --- SVG Icons ---
const ArrowUpRightIcon = () => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
    >
        <path d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
);

const GraphUpIcon = () => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-green-400"
    >
        <path d="M21 21H3V3" />
        <path d="M18 17l-5-5-4 4-3-3" />
        <path d="M18 7h-6v6" />
    </svg>
);
// --- End SVG Icons ---

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SectionEndLanding = () => {
    return (
        <div className="min-h-screen text-white p-8 md:p-16 lg:p-24">
            <div className="max-w-7xl mx-auto">
                {/* 1. Bagian Atas (Hero) */}
                <motion.section
                    className="mb-32"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                >
                    <motion.h1
                        className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8"
                        variants={fadeUp}
                    >
                        Shape your
                        <br />
                        identity.
                    </motion.h1>

                    <motion.div
                        className="flex items-center gap-4 mb-10"
                        variants={fadeUp}
                    >
                        <span className="w-5 h-5 bg-blue-600 rounded-full"></span>
                        <p className="text-xl md:text-2xl text-gray-300">
                            Less ordinary, more you
                        </p>
                    </motion.div>

                    <motion.button
                        className="flex items-center gap-2 text-lg font-medium border border-gray-600 px-6 py-3 rounded-lg hover:border-white transition-colors"
                        variants={fadeUp}
                    >
                        <span>Learn More</span>
                        <ArrowUpRightIcon />
                    </motion.button>
                </motion.section>

                {/* 2. Bagian Bawah (Content + Image) */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Kolom Kiri: Teks & Statistik */}
                    <motion.div
                        className="flex flex-col gap-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                World-class teams
                                <br />
                                are upgrading to
                                <br />
                                Welcome
                            </h2>
                            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
                                Companies are ditching legacy platforms for the ability
                                to deliver an engaging experience at every level.
                            </p>
                        </div>

                        <div className="border-t border-gray-800 pt-8">
                            <div className="flex items-center gap-4 mb-2">
                                <GraphUpIcon />
                                <span className="text-4xl font-bold text-green-400">
                                    66% attendance rate
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 tracking-wide">
                                avg attendance for Welcome customers
                            </p>
                        </div>
                    </motion.div>

                    {/* Kolom Kanan: Gambar */}
                    <motion.div
                        className="w-full h-[500px] rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
                            alt="Team selfie"
                            className="w-full h-full object-cover grayscale"
                        />
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default SectionEndLanding;
