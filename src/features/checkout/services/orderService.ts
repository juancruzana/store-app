import { api } from "@/lib/axios";
import type { Pedido, PedidoCreateRequest } from "../../auth/types";

export const orderService = {
  create: async (data: PedidoCreateRequest): Promise<Pedido> => {
    const { data: pedido } = await api.post<Pedido>("/pedidos", data);
    return pedido;
  },
  listMine: async (): Promise<Pedido[]> => {
    const { data } = await api.get<{ items: Pedido[] }>("/pedidos");
    return data.items;
  },
  getById: async (id: number): Promise<Pedido> => {
    const { data } = await api.get<Pedido>(`/pedidos/${id}`);
    return data;
  },
  cancelarMio: async (id: number): Promise<Pedido> => {
    const { data } = await api.patch<Pedido>(`/pedidos/${id}/estado`, {
      estado_codigo: "CANCELADO",
      observacion: "Cancelado por el cliente",
    });
    return data;
  },
};