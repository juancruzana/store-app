import { create } from "zustand";
import { authService, type Usuario } from "../services/authService";

interface AuthState {
  user: Usuario | null;
  isReady: boolean;
  init: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isReady: false,

  init: async () => {
    try {
      const user = await authService.autoLogin();
      set({ user, isReady: true });
    } catch {
      set({ isReady: true });
    }
  },
}));
