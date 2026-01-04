import React from "react";
import { motion } from "framer-motion";

// --- SVG Icons (Local) ---
const PlayIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10"
    >
        <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.048a.9.9 0 01-1.421-.8V9.935a.9.9 0 011.421-.8l5.603 3.048z"
            clipRule="evenodd"
        />
    </svg>
);
// --- END SVG Icons ---

// --- animation variants ---
const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
// --- end variants ---

export default function SectionAbout() {
    return (
        <section className="relative z-10 py-24 px-6 md:px-16 lg:px-32 text-white">
            <div className="max-w-7xl mx-auto text-center">
                {/* Header Text */}
                <motion.h1
                    className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                >
                    your calendar
                    <br />
                    as a service
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-gray-400 mt-6 max-w-lg mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    transition={{ delay: 0.1 }}
                >
                    The joyful productivity app. Schedule time for todos, events, and
                    contacts.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    className="flex flex-col items-center mt-10 space-y-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    transition={{ delay: 0.2 }}
                >
                    <button className="text-white px-7 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/10 transition-colors text-base">
                        Try it now
                    </button>
                    <p className="text-gray-500 text-sm">free for personal use</p>
                </motion.div>
            </div>

            {/* Grid Cards */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto mt-20 auto-rows-fr"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
            >
                {/* Card 1 */}
                <motion.div
                    className="col-span-1 row-span-2 rounded-3xl overflow-hidden"
                    variants={fadeUp}
                >
                    <img
                        src="https://placehold.co/400x600/000/fff?text=Image+1"
                        alt="Calendar"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    className="col-span-1 row-span-1 rounded-3xl overflow-hidden"
                    variants={fadeUp}
                    transition={{ delay: 0.1 }}
                >
                    <img
                        src="https://placehold.co/400x400/222/999?text=Image"
                        alt="Team member"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    className="col-span-1 row-span-2 rounded-3xl p-5 flex flex-col h-full text-purple-200"
                    variants={fadeUp}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center space-x-2 mb-4">
                        <img
                            src="https://placehold.co/100x100/f3e8ff/9333ea?text=S"
                            alt="Sophia"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <span className="font-semibold text-white">Sophia</span>
                            <span className="text-purple-400 text-sm block">5m ago</span>
                        </div>
                    </div>
                    <span className="text-purple-300 font-medium mb-2">
                        Upcoming events
                    </span>
                    <div className="space-y-2">
                        <div className="rounded-lg p-3 flex space-x-3 bg-white/10">
                            <div className="text-center font-semibold">
                                <span className="text-xs text-purple-400">Jan</span>
                                <span className="block text-xl text-white">28</span>
                            </div>
                            <div className="border-l border-purple-500/40 pl-3">
                                <span className="font-semibold text-white">Design sync</span>
                                <span className="block text-purple-400 text-sm">
                                    1pm – 1:30pm
                                </span>
                            </div>
                        </div>
                        <div className="rounded-lg p-3 flex space-x-3 bg-white/10">
                            <div className="text-center font-semibold">
                                <span className="text-xs text-purple-400">Jan</span>
                                <span className="block text-xl text-white">29</span>
                            </div>
                            <div className="border-l border-purple-500/40 pl-3">
                                <span className="font-semibold text-white">Board meeting</span>
                                <span className="block text-purple-400 text-sm">
                                    2pm – 5pm
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Card 4 */}
                <motion.div
                    className="col-span-1 row-span-1 rounded-3xl p-6 flex items-center border border-white/10"
                    variants={fadeUp}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-2xl font-semibold leading-snug text-gray-200">
                        Instantly know if someone is available
                    </span>
                </motion.div>

                {/* Card 5 */}
                <motion.div
                    className="col-span-1 row-span-1 rounded-3xl p-6 flex items-center border border-white/10"
                    variants={fadeUp}
                    transition={{ delay: 0.4 }}
                >
                    <span className="text-2xl font-semibold leading-snug text-gray-200">
                        Always know what your team is up to
                    </span>
                </motion.div>

                {/* Card 6 */}
                <motion.div
                    className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative"
                    variants={fadeUp}
                    transition={{ delay: 0.5 }}
                >
                    <img
                        src="https://placehold.co/400x400/555/ccc?text=Video"
                        alt="How it works"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end justify-start p-4">
                        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white py-2 px-3 rounded-full">
                            <PlayIcon />
                            <span className="font-medium text-sm">Watch how it works</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
