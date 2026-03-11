export const getDisplayName = (user) => user?.username || "Admin";

export const getInitial = (user) => user?.username?.charAt(0).toUpperCase() || "A";

export const getDisplayEmail = (user) => user?.email || "admin@mqfm.com";
