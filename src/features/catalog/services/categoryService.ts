import { api } from "@/lib/axios";
import type { Categoria, PaginatedResponse } from "../types";

export const categoryService = {
  list: async (): Promise<PaginatedResponse<Categoria>> => {
    const { data } = await api.get("/api/v1/categorias");
    return data;
  },
  getById: async (id: number): Promise<Categoria> => {
    const { data } = await api.get(`/api/v1/categorias/${id}`);
    return data;
  },
};
