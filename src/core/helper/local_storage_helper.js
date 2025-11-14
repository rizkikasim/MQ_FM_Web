import { STORAGE_KEYS } from "../constant/storage_constant";

export const LocalStorageHelper = {
  saveToken: (token) => {
    if (!token) return;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  saveUser: (user) => {
    if (!user) return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  saveProfileTheme: (theme) => {
    if (!theme) return;
    localStorage.setItem(
      STORAGE_KEYS.PROFILE_THEME,
      JSON.stringify(theme)
    );
  },

  saveAll: ({ token, user, profileTheme }) => {
    if (token) localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    if (user)
      localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(user)
      );
    if (profileTheme)
      localStorage.setItem(
        STORAGE_KEYS.PROFILE_THEME,
        JSON.stringify(profileTheme)
      );
  },

  getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),

  getUser: () =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "null"),

  getProfileTheme: () =>
    JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE_THEME) || "null"),

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.PROFILE_THEME);
  },
};
