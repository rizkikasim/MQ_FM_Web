// src/core/helper/Auth_Admin_Header_Helper.js

export const AuthHeaderAdmin = () => {
  const token = localStorage.getItem("admin_token"); // hanya admin token

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};
