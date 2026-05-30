import { api } from "@/lib/axios";
import type { Pedido, PedidoCreateRequest } from "../types";

export const orderService = {
  create: async (data: PedidoCreateRequest): Promise<Pedido> => {
    const { data: pedido } = await api.post<Pedido>("/api/v1/pedidos", data);
    return pedido;
  },
  listMine: async (): Promise<Pedido[]> => {
    const { data } = await api.get<Pedido[]>("/api/v1/pedidos");
    return data;
  },
  getById: async (id: number): Promise<Pedido> => {
    const { data } = await api.get<Pedido>(`/api/v1/pedidos/${id}`);
    return data;
  },
};
