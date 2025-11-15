export function getAdminToken() {
  try {
    const saved = localStorage.getItem("mqfm_admin_auth");
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    return parsed?.state?.token || null;

  } catch (e) {
    return null;
  }
}
