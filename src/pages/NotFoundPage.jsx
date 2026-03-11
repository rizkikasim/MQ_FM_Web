import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-[#111317] text-white">
    <h1 className="mb-2 text-7xl font-bold text-purple-500">404</h1>
    <p className="mb-6 text-lg text-gray-400">Halaman tidak ditemukan</p>
    <Link
      to="/"
      className="rounded-lg bg-purple-600 px-6 py-2.5 font-medium transition hover:bg-purple-700"
    >
      Kembali ke Beranda
    </Link>
  </div>
);

export default NotFoundPage;
