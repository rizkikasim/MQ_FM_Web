import { memo, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const FIELDS = [
  { label: "Full Name", key: "fullName", type: "text", placeholder: "Enter full name" },
  { label: "Username", key: "username", type: "text", placeholder: "Enter username" },
  { label: "Phone", key: "phone", type: "text", placeholder: "Enter phone number" },
  { label: "Email", key: "email", type: "email", placeholder: "Enter email address" },
];

const RegisterForm = memo(({ onSubmit, loading, error, success }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");
    if (form.password !== form.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    const { confirmPassword, ...payload } = form;
    onSubmit(payload);
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 text-white relative z-20">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-full bg-blue-400 opacity-90" />
            <span className="w-7 h-7 rounded-full bg-blue-600 -ml-5" />
          </div>
          <span className="text-3xl font-bold ml-2">CoLabs Admin</span>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-left">Register Admin</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">{error}</div>
        )}
        {validationError && (
          <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded text-yellow-200 text-sm">
            {validationError}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-200 text-sm">
            Registration successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {FIELDS.map(({ label, key, type, placeholder }) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
              <input
                type={type}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder={placeholder}
                value={form[key]}
                onChange={handleChange(key)}
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Create password"
                value={form.password}
                onChange={handleChange("password")}
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg ${
              loading ? "bg-blue-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Create Admin Account"}
          </button>

          <div className="text-center mt-8">
            <span className="text-sm text-gray-400">
              Already admin?{" "}
              <Link to="/admin/login" className="font-semibold text-blue-400 hover:underline">
                Login here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
});

export default RegisterForm;
