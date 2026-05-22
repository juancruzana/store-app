import { create } from "zustand";
import type { Usuario } from "@/features/auth/types";

interface AuthState {
  user: Usuario | null;
  isAuthenticated: boolean;
  setUser: (user: Usuario) => void;
  clearUser: () => void;
  hasRole: (codigo: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  hasRole: (codigo) => {
    const user = get().user;
    if (!user) return false;
    return user.roles.some((r) => r.codigo === codigo);
  },
}));