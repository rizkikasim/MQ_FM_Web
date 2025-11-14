// src/core/helper/auth_header_helper.js

export const AuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};
