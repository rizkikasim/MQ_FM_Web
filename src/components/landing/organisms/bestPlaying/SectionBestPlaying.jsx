import React from "react";
import { motion } from "framer-motion";
import localImage from "../../../../assets/images/img_example_6.png";

// --- SVG Icon ---
const ArrowIcon = () => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
    >
        <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
        />
    </svg>
);
// --- END SVG ---

// --- Animation Variants ---
const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
// --- END Variants ---

const SectionBestPlaying = () => {
    return (
        <div className="min-h-screen text-stone-100 p-8 md:p-12 lg:p-16">
            {/* Header */}
            <motion.header
                className="flex justify-between items-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
            >
                <h2 className="text-4xl md:text-5xl font-bold">
                    My Best <span className="italic text-lime-300 font-serif">seller</span>
                </h2>
                <button className="flex items-center gap-2 bg-lime-300 text-black font-semibold py-2 px-5 rounded-full text-sm hover:bg-lime-200 transition-colors">
                    <span>View all</span>
                    <ArrowIcon />
                </button>
            </motion.header>

            {/* Grid */}
            <main className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12">
                {/* Kolom 1 */}
                <div className="flex flex-col gap-y-12">
                    {[ // kumpulan data card biar singkat
                        { title: "Local Collection", sub: "Exclusive Asset", price: "$99", variant: "1 Variant" },
                        { title: "Casual Cotton Shirt", sub: "Men's Collection", price: "$58", variant: "3 Variant" },
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeUp}
                            transition={{ delay: idx * 0.15 }}
                        >
                            <div className="rounded-xl mb-4 overflow-hidden">
                                <img
                                    src={localImage}
                                    alt={item.title}
                                    className="w-full h-[300px] object-cover object-center"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-stone-400">{item.sub}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">{item.price}</p>
                                    <p className="text-sm text-stone-400">{item.variant}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Kolom 2 */}
                <div className="flex flex-col gap-y-12 md:mt-24">
                    {[
                        { title: "Customized Wear", sub: "Women's Collection", price: "$75", variant: "2 Variant" },
                        { title: "Woolen Fabric T-Shirt", sub: "Men's Collection", price: "$37", variant: "1 Variant" },
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeUp}
                            transition={{ delay: idx * 0.15 }}
                        >
                            <div className="rounded-xl mb-4 overflow-hidden">
                                <img
                                    src={localImage}
                                    alt={item.title}
                                    className="w-full h-[300px] object-cover object-center"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-stone-400">{item.sub}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">{item.price}</p>
                                    <p className="text-sm text-stone-400">{item.variant}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default SectionBestPlaying;
