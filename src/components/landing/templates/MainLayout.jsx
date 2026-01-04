import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../organisms/navbar/Navbar";
import Footer from "../organisms/footer/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="relative w-full text-white font-sans">
            <Navbar />
            <main className="min-h-screen">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
