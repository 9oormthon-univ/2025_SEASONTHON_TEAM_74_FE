import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  login: (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    set({ user: userData });
  },

  logout: () => {
    localStorage.removeItem("userData");
    set({ user: null });
  },

  initialize: () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      set({ user: JSON.parse(userData) });
    }
  },

}));