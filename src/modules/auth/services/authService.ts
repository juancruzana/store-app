import { api } from "@/lib/axios";

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string | null;
  activo: boolean;
  roles: { id: number; codigo: string; nombre: string }[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono?: string;
}

export const authService = {
  me: async (): Promise<Usuario> => {
    const { data } = await api.get<Usuario>("/api/v1/auth/me");
    return data;
  },

  login: async (email: string, password: string): Promise<void> => {
    await api.post("/api/v1/auth/login", { email, password });
  },

  logout: async (): Promise<void> => {
    await api.post("/api/v1/auth/logout");
  },

  register: async (datos: RegisterRequest): Promise<Usuario> => {
    const { data } = await api.post<Usuario>("/api/v1/auth/register", datos);
    return data;
  },
};
