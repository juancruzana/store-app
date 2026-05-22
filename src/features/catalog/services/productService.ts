import { api } from "@/lib/axios";
import type { Producto, ProductoFilters, PaginatedResponse } from "../types";

export const productService = {
  list: async (filters: ProductoFilters = {}): Promise<PaginatedResponse<Producto>> => {
    const { data } = await api.get("/api/v1/productos", { params: filters });
    return data;
  },
  getById: async (id: number): Promise<Producto> => {
    const { data } = await api.get(`/api/v1/productos/${id}`);
    return data;
  },
};
