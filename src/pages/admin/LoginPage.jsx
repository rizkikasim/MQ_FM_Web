import { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { carouselItems } from "../../shared/data/carouselItems";
import { useLoginAdmin } from "../../features/auth/model/useLoginAdmin";
import AuthCarousel from "../../features/auth/ui/AuthCarousel";
import LoginForm from "../../features/auth/ui/LoginForm";

const LoginPage = memo(() => {
  const navigate = useNavigate();
  const { loginAdmin, loading, error, success, resetState } = useLoginAdmin();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((i) => (i + 1) % carouselItems.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => { resetState(); navigate("/admin/dashboard"); }, 1500);
      return () => clearTimeout(t);
    }
  }, [success, navigate, resetState]);

  const handleSubmit = useCallback(async (payload) => {
    try { await loginAdmin(payload); } catch (_) {}
  }, [loginAdmin]);

  return (
    <div className="flex min-h-screen text-gray-900 relative overflow-hidden">
      <AuthCarousel items={carouselItems} activeIndex={activeIndex} onDotClick={setActiveIndex} />
      <LoginForm onSubmit={handleSubmit} loading={loading} error={error} success={success} />
    </div>
  );
});

export default LoginPage;
