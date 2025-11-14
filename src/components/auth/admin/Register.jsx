import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { carouselItems } from "../../../data/item/ItemLogin";
import { Link } from "react-router-dom";

const RegisterAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // AUTO SLIDE BG
  useEffect(() => {
    const timer = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % carouselItems.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const currentItem = carouselItems[activeIndex];

  const TEXT_VARIANTS = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -25, transition: { duration: 0.6, ease: "easeIn" } },
  };

  // PURE UI → no submit logic
  const handleRegister = (e) => {
    e.preventDefault();
    // kosong, tidak ada logic
  };

  return (
    <div className="flex min-h-screen text-gray-900 relative overflow-hidden">

      {/* LEFT PANEL (FORM) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 text-white relative z-20">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-blue-400 opacity-90"></span>
              <span className="w-7 h-7 rounded-full bg-blue-600 -ml-5"></span>
            </div>
            <span className="text-3xl font-bold ml-2">CoLabs Admin</span>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-left">Register Admin</h1>

          {/* FORM */}
          <form onSubmit={handleRegister}>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
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

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Create Admin Account
            </button>

            {/* Login link */}
            <div className="text-center mt-8">
              <span className="text-sm text-gray-400">
                Already admin?{" "}
                <Link
                  to="/admin/login"
                  className="font-semibold text-blue-400 hover:underline"
                >
                  Login here
                </Link>
              </span>
            </div>

          </form>
        </div>
      </div>

      {/* RIGHT PANEL (BACKGROUND SLIDER) */}
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
                  dangerouslySetInnerHTML={{ __html: currentItem.title }}
                />
                <p className="text-base lg:text-lg text-white/80 mb-8 max-w-md">
                  {currentItem.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RegisterAdmin;
