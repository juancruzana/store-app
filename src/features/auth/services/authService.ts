import { api } from "@/lib/axios";
import type { LoginRequest, RegisterRequest, Usuario } from "../types";

export const authService = {
  login: async (data: LoginRequest): Promise<Usuario> => {
    const { data: user } = await api.post<Usuario>("/auth/login", data);
    return user;
  },
  register: async (data: RegisterRequest): Promise<Usuario> => {
    const { data: user } = await api.post<Usuario>("/auth/register", data);
    return user;
  },
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
  me: async (): Promise<Usuario> => {
    const { data: user } = await api.get<Usuario>("/auth/me");
    return user;
  },
};