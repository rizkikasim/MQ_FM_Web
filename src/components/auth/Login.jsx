import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import icGoogle from "../../assets/icons/ic_google.png";
import { carouselItems } from "../../data/item/ItemLogin";
import { useNavigate, useLocation } from "react-router-dom";

// Zustand login store
import { useLoginAuthStore } from "../../core/logic/auth/user/login_auth_zustand/login_auth_zustand";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // FORM STATE
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Ambil dari Zustand
  const { loading, error, token, loginUser } = useLoginAuthStore();

  // 🔥 FIX LOOP LOGIN → Redirect hanya jika user BENAR-BENAR di halaman "/login"
  useEffect(() => {
    if (token && location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, [token, location.pathname, navigate]);

  // AUTO SLIDE LOGIN ANIMATION
  useEffect(() => {
    const timer = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % carouselItems.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const currentItem = carouselItems[activeIndex];

  // LOGIN ACTION
  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = { identifier, password };

    try {
      await loginUser(payload);
      // Redirect akan di-handle otomatis oleh useEffect di atas
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -25, transition: { duration: 0.6, ease: "easeIn" } },
  };

  return (
    <div className="flex min-h-screen text-gray-900 relative overflow-hidden">
      {/* LEFT PANEL */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentItem.image})` }}
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
            src={currentItem.image}
            alt="carousel"
            className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-3xl"
          />

          <div className="relative z-20 text-white">
            <motion.div
              key={activeIndex}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1
                className="text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: currentItem.title }}
              />
              <p className="text-base lg:text-lg text-white/80 mb-8 max-w-md">
                {currentItem.subtitle}
              </p>
            </motion.div>
          </div>

          <div className="relative z-20 mt-6 flex items-center justify-start">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/30 shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeIndex === index
                      ? "bg-white/70 backdrop-blur-[2px] border border-white/50 shadow-[0_0_8px_2px_rgba(255,255,255,0.4)] scale-110"
                      : "bg-white/40 hover:bg-white/70"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 text-white relative z-20">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-blue-400 opacity-90"></span>
              <span className="w-7 h-7 rounded-full bg-blue-600 -ml-5"></span>
            </div>
            <span className="text-3xl font-bold ml-2">CoLabs</span>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-left">Welcome Back!</h1>

          {/* FORM */}
          <form onSubmit={handleLogin}>
            {/* IDENTIFIER */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Identifier
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email / username / phone"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              {loading ? "Loading..." : "Sign in"}
            </button>

            <button
              type="button"
              className="w-full bg-white text-gray-700 p-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition duration-300 shadow-lg mt-4 flex items-center justify-center"
            >
              <img
                src={icGoogle}
                alt="Google"
                className="w-5 h-5 mr-2 object-contain"
              />
              Sign in with Google
            </button>
          </form>

          <div className="text-center mt-8">
            <span className="text-sm text-gray-400">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-blue-400 hover:underline"
              >
                Register now
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
