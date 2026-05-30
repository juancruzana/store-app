import { api } from "@/lib/axios";

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
}

const CLIENT_EMAIL = import.meta.env.VITE_CLIENT_EMAIL ?? "cliente@foodstore.local";
const CLIENT_PASSWORD = import.meta.env.VITE_CLIENT_PASSWORD ?? "Cliente1234!";

export const authService = {
  me: async (): Promise<Usuario> => {
    const { data } = await api.get<Usuario>("/api/v1/auth/me");
    return data;
  },

  autoLogin: async (): Promise<Usuario> => {
    await api.post("/api/v1/auth/login", {
      email: CLIENT_EMAIL,
      password: CLIENT_PASSWORD,
    });
    const { data } = await api.get<Usuario>("/api/v1/auth/me");
    return data;
  },
};
