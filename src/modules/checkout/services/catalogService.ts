import { api } from "@/lib/axios";

export interface FormaPago {
  id: number;
  codigo: string;
  nombre: string;
  activa: boolean;
}

export const catalogService = {
  formasPago: async (): Promise<FormaPago[]> => {
    const { data } = await api.get<FormaPago[]>("/api/v1/formas-pago");
    return data;
  },
};
