export const AuthHeader = (url = "") => {
  // Ambil state admin dari persist Zustand
  const adminState = JSON.parse(localStorage.getItem("mqfm_admin_auth") || "{}");
  const adminToken = adminState?.state?.token;

  // Ambil token user
  const userToken = localStorage.getItem("token");

  // ================
  // 🔥 RULES:
  // admin → hanya untuk endpoint admin
  // user  → hanya untuk endpoint user
  // no token → public
  // ================

  if (url.includes("/admin/")) {
    // Endpoint admin: wajib pakai token admin
    if (!adminToken) return {};
    return {
      Authorization: `Bearer ${adminToken}`,
    };
  }

  if (url.includes("/user/")) {
    // Endpoint user: jangan pake token admin
    if (!userToken) return {};
    return {
      Authorization: `Bearer ${userToken}`,
    };
  }

  // Public endpoint (tanpa auth)
  return {};
};
