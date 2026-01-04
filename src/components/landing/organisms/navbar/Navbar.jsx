import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 🚫 Skip efek scroll di halaman login & register
        if (location.pathname === "/login" || location.pathname === "/register") return;

        const handleScroll = () => setShowNavbar(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    // 🚫 Jangan render navbar sama sekali di halaman login & register
    if (location.pathname === "/login" || location.pathname === "/register") return null;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${showNavbar
                ? "opacity-100 translate-y-0 backdrop-blur-md bg-white/5 shadow-md"
                : "opacity-0 -translate-y-10 pointer-events-none"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <h1 className="text-lg font-semibold tracking-wide">MQFM Podcast</h1>
                <ul className="flex gap-6 text-sm text-gray-200">
                    <li
                        className="hover:text-white transition-colors cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </li>
                    <li
                        className="hover:text-white transition-colors cursor-pointer"
                        onClick={() => navigate("/episode")}
                    >
                        Episode
                    </li>
                    <li
                        className="hover:text-white transition-colors cursor-pointer"
                        onClick={() => navigate("/admin/login")}
                    >
                        Login
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
