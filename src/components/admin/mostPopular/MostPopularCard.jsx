// \\wsl.localhost\Ubuntu-22.04\home\lif\Projects\mqfe\mqfm-web\src\components\admin\mostPopular\MostPopularCard.jsx
// Sesuai permintaan Anda, file ini berisi SEMUA komponen dari gambar dasbor.

import React from 'react';
import {
    MoreVertical,
    Zap,
    Star,
    FileText,
    RefreshCw,
    UserCheck,
} from 'lucide-react';

// === KOMPONEN BANTUAN ===
/**
 * Sebuah wrapper 'Glass Card' yang dapat digunakan kembali
 * untuk memberikan efek glassmorphism yang konsisten.
 */
const GlassCard = ({ children, className = '' }) => (
    <div
        className={`bg-purple-900/10 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 shadow-xl ${className}`}
    >
        {children}
    </div>
);


// === SEMUA KOMPONEN WIDGET DARI GAMBAR ===

/**
 * 1. Widget Grafik Performance
 */
const PerformanceChart = () => (
    <GlassCard className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-gray-400">Performance</p>
                <h2 className="text-3xl font-bold text-white mt-1">$12,897.20</h2>
                <p className="text-xs text-gray-500 mt-1">Real time updates</p>
            </div>
            {/* Legenda */}
            <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                    <span>This Month</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    <span>Last Month</span>
                </div>
            </div>
        </div>

        {/* Mockup Grafik */}
        <div className="flex-grow w-full h-64 relative mt-4">
            {/* Garis Sumbu Y */}
            <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-xs text-gray-500">
                <span>10K</span>
                <span>8K</span>
                <span>6K</span>
                <span>4K</span>
                <span>2K</span>
                <span>0K</span>
            </div>

            {/* Area Grafik (Mockup) */}
            <div className="absolute inset-0 pl-8 pb-8 h-full w-full">
                {/* Gradien Latar Belakang */}
                <div
                    className="w-full h-full"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0) 100%)'
                    }}
                >
                    {/* Garis SVG */}
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 100">
                        <polyline
                            fill="none"
                            stroke="#c084fc"
                            strokeWidth="2.5"
                            points="0,50 50,60 100,40 150,55 200,45 250,65 300,50 350,70 400,60 450,80 500,70"
                        />
                    </svg>
                </div>

                {/* Tooltip Mockup */}
                <div className="absolute" style={{ left: '210px', top: '55px' }}>
                    <div className="bg-gray-900 border border-purple-400/50 rounded-lg p-2 text-center shadow-lg">
                        <p className="text-xs text-gray-400">Total Earning</p>
                        <p className="text-sm font-bold text-white">4,62.00</p>
                        <p className="text-xs text-green-400">+12%</p>
                    </div>
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full border-2 border-gray-900 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
            </div>

            {/* Sumbu X (Tanggal) */}
            <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500">
                <span>1 Jun</span>
                <span>5 July</span>
                <span>8 Aug</span>
                <span>12 Sep</span>
                <span>22 Oct</span>
                <span>28 Nov</span>
                <span>28 Dec</span>
                <span>30 Jan</span>
                <span>10 Feb</span>
                <span>10 Mar</span>
                <span>14 Apr</span>
            </div>
        </div>
    </GlassCard>
);

/**
 * 2. Widget Registration Status
 */
const RegistrationStatus = () => (
    <GlassCard className="flex flex-col gap-6">
        {/* Registration Status */}
        <div>
            <h3 className="text-lg font-semibold text-white mb-3">Registration Status</h3>
            <div className="bg-purple-800/50 text-purple-300 text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
                In Progress
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                <div className="bg-purple-400 h-2.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
        </div>

        {/* Proposal Processing */}
        <div>
            <h3 className="text-lg font-semibold text-white">Proposal Processing</h3>
            <p className="text-gray-400 text-sm mb-4">6-8 Business Days</p>
            <button className="w-full flex justify-between items-center bg-purple-600/50 hover:bg-purple-600/80 transition-colors text-white font-semibold py-3 px-5 rounded-xl border border-purple-500/50">
                <span>View All</span>
                <Star size={18} fill="currentColor" />
            </button>
        </div>
    </GlassCard>
);

/**
 * 3. Widget To Do List
 */
const ToDoList = () => {
    const items = [
        { icon: FileText, title: 'Run Payroll', time: 'Mar 4 at 6:00pm', amount: '$120' },
        { icon: RefreshCw, title: 'Request for Leave', time: 'Mar 4 at 6:00pm', amount: '$110' },
        { icon: UserCheck, title: 'Onboarding Done', time: 'Mar 4 at 6:00pm', amount: '$180' },
    ];

    return (
        <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">To Do List</h3>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-800/50 rounded-full">
                                <item.icon size={18} className="text-purple-300" />
                            </div>
                            <div>
                                <p className="font-medium text-white">{item.title}</p>
                                <p className="text-xs text-gray-400">{item.time}</p>
                            </div>
                        </div>
                        <span className="font-semibold text-white">{item.amount}</span>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
};

/**
 * 4. Widget Customer List (Saya ganti nama jadi MostPopularCard agar sesuai nama file)
 */
const MostPopularCard = () => {
    const popularTracks = [
        { id: 1, name: 'Danny Liu', handle: '@dnnc32', avatar: 'https://via.placeholder.com/40/8B5CF6/FFFFFF?text=DL', deals: '1023.00', revenue: '$37,431' },
        { id: 2, name: 'Gandy', handle: '@gandy', avatar: 'https://via.placeholder.com/40/EC4899/FFFFFF?text=G', deals: '963.00', revenue: '$30,431' },
        { id: 3, name: 'Mahmud', handle: '@mahmud', avatar: 'https://via.placeholder.com/40/F59E0B/FFFFFF?text=M', deals: '1020.00', revenue: '$36,431' },
    ];

    return (
        <GlassCard>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Customer List</h2>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>
            <div className="flex flex-col">
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 mb-4 px-2">
                    <span className="text-xs text-gray-400 uppercase font-medium tracking-wider">Name</span>
                    <span className="text-xs text-gray-400 uppercase font-medium tracking-wider text-right">Deals</span>
                    <span className="text-xs text-gray-400 uppercase font-medium tracking-wider text-right">Total Deal value</span>
                </div>
                <div className="space-y-4">
                    {popularTracks.map((track) => (
                        <div key={track.id} className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-center">
                            <div className="flex items-center gap-3">
                                <img src={track.avatar} alt={track.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p className="font-medium text-white">{track.name}</p>
                                    <p className="text-xs text-gray-400">{track.handle}</p>
                                </div>
                            </div>
                            <p className="font-medium text-white text-right">{track.deals}</p>
                            <p className="font-semibold text-white text-right">{track.revenue}</p>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
};

/**
 * 5. Widget Premium Plan
 */
const PremiumPlanCard = () => (
    <GlassCard className="h-full flex flex-col justify-between">
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-600/50 rounded-lg border border-purple-500/50">
                <Zap size={24} className="text-purple-300" />
            </div>
            <h3 className="text-lg font-semibold text-white">Premium Plane</h3>
        </div>

        <div className="mb-4">
            <span className="text-4xl font-bold text-white">$20</span>
            <span className="text-gray-400 ml-2">Per Month</span>
            <span className="text-gray-400 ml-1">Per Users</span>
        </div>

        <p className="text-sm text-gray-400 mb-6">
            Our pricing model is designed to be flexible and transparent. The plan is billed per month, ensuring that you only pay for the duration you need.
        </p>

        <button className="w-full flex justify-between items-center bg-purple-600/50 hover:bg-purple-600/80 transition-colors text-white font-semibold py-3 px-5 rounded-xl border border-purple-500/50">
            <span>Get Started</span>
            <Star size={18} fill="currentColor" />
        </button>
    </GlassCard>
);

/**
 * 6. Widget Quick Transfer
 */
const QuickTransfer = () => (
    <GlassCard>
        <h3 className="text-lg font-semibold text-white mb-4">Quick Transfer</h3>
        <div className="flex justify-between items-center bg-purple-900/20 border border-purple-500/20 rounded-xl p-4">
            <span className="text-gray-400">Amount</span>
            <span className="text-2xl font-bold text-white">$570</span>
        </div>
    </GlassCard>
);


/**
 * === KOMPONEN UTAMA (DEFAULT EXPORT) ===
 * Ini adalah komponen yang akan di-export oleh file ini.
 * Komponen ini merakit SEMUA widget di atas menjadi tata letak dasbor.
 */
const FullDashboardLayout = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0c2e] to-[#0f051a] p-8 text-gray-200 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto] gap-6">

                {/* --- KOLOM KIRI (GRAFIK & MOST POPULAR) --- */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <PerformanceChart />
                    <MostPopularCard />
                </div>

                {/* --- KOLOM KANAN (SIDEBAR) --- */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <RegistrationStatus />
                    <ToDoList />
                    <PremiumPlanCard />
                    <QuickTransfer />
                </div>

            </div>
        </div>
    );
};


// Ekspor SELURUH DASBOR sebagai default
export default FullDashboardLayout;