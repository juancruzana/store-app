import { api } from "@/lib/axios";

export interface DireccionRead {
  id: number;
  alias: string;
  calle: string;
  numero: string;
  ciudad: string;
  referencia: string | null;
  es_principal: boolean;
}

export interface DireccionCreate {
  alias: string;
  calle: string;
  numero: string;
  ciudad: string;
  referencia?: string;
}

export const direccionService = {
  list: async (): Promise<DireccionRead[]> => {
    const { data } = await api.get<DireccionRead[]>("/api/v1/direcciones");
    return data;
  },

  create: async (body: DireccionCreate): Promise<DireccionRead> => {
    const { data } = await api.post<DireccionRead>("/api/v1/direcciones", body);
    return data;
  },
};
