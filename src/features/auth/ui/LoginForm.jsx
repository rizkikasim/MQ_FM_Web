import { memo, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import icGoogle from "../../../assets/icons/ic_google.png";

const LoginForm = memo(({ onSubmit, loading, error, success }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 text-white relative z-20">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-full bg-green-400 opacity-90" />
            <span className="w-7 h-7 rounded-full bg-green-600 -ml-5" />
          </div>
          <span className="text-3xl font-bold ml-2">CoLabs Admin</span>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-left">Admin Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-200 text-sm">
            Login successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg ${
              loading ? "bg-green-800 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            className="w-full bg-white text-gray-700 p-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition duration-300 shadow-lg mt-4 flex items-center justify-center"
          >
            <img src={icGoogle} alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <div className="text-center mt-8">
            <span className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/admin/register" className="font-semibold text-green-400 hover:underline">
                Register here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
});

export default LoginForm;
