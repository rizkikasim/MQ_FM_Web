import { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { carouselItems } from "../../shared/data/carouselItems";
import { useRegisterAdmin } from "../../features/auth/model/useRegisterAdmin";
import AuthCarousel from "../../features/auth/ui/AuthCarousel";
import RegisterForm from "../../features/auth/ui/RegisterForm";

const RegisterPage = memo(() => {
  const navigate = useNavigate();
  const { registerAdmin, loading, error, success, resetState } = useRegisterAdmin();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((i) => (i + 1) % carouselItems.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => { resetState(); navigate("/admin/login"); }, 2000);
      return () => clearTimeout(t);
    }
  }, [success, navigate, resetState]);

  const handleSubmit = useCallback(async (payload) => {
    try { await registerAdmin(payload); } catch (_) {}
  }, [registerAdmin]);

  return (
    <div className="flex min-h-screen text-gray-900 relative overflow-hidden">
      <AuthCarousel items={carouselItems} activeIndex={activeIndex} onDotClick={setActiveIndex} />
      <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} success={success} />
    </div>
  );
});

export default RegisterPage;
