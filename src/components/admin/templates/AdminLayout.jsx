import React from "react";
import Sidebar from "../organisms/sidebar/Sidebar";


// Layout yang membungkus seluruh halaman Admin (Sidebar, header, content)
const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#111317] text-white overflow-hidden font-urbanist">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">


                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 text-gray-200">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
