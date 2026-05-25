import { api } from "@/lib/axios";
import type { Pedido, PedidoCreateRequest } from "@/types/checkout";

export const orderService = {
  create: async (data: PedidoCreateRequest): Promise<Pedido> => {
    const { data: pedido } = await api.post<Pedido>("/pedidos", data);
    return pedido;
  },
  listMine: async (): Promise<Pedido[]> => {
    const { data } = await api.get<{ items: Pedido[] }>("/pedidos");
    return data.items;
  }
};
