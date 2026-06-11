import { create } from "zustand";
import { authService, type Usuario } from "../services/authService";

interface AuthState {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearSession: () => void;
  setError: (msg: string | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setError: (msg) => set({ error: msg }),

  clearSession: () =>
    set({ user: null, isAuthenticated: false, isLoading: false, error: null }),

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.me();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      await authService.login(email, password);
      const user = await authService.me();
      set({ user, isAuthenticated: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Email o contraseña incorrectos";
      set({ user: null, isAuthenticated: false, error: msg });
      throw e;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Si falla la red, limpiamos igualmente
    }
    set({ user: null, isAuthenticated: false, error: null, isLoading: false });
  },
}));
