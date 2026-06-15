import { api } from "@/lib/axios";

export interface DireccionRead {
  id: number;
  alias: string;
  calle: string;
  numero: string;
  ciudad: string;
  referencia: string | null;
  codigo_postal?: string | null;
  es_principal: boolean;
}

export interface DireccionCreate {
  alias: string;
  calle: string;
  numero: string;
  ciudad: string;
  referencia?: string;
  codigo_postal?: string;
  es_principal?: boolean;
}

export type DireccionUpdate = Partial<Omit<DireccionCreate, "es_principal">>;

export const direccionService = {
  list: async (): Promise<DireccionRead[]> => {
    const { data } = await api.get<DireccionRead[]>("/api/v1/direcciones");
    return data;
  },

  create: async (body: DireccionCreate): Promise<DireccionRead> => {
    const { data } = await api.post<DireccionRead>("/api/v1/direcciones", body);
    return data;
  },

  update: async (id: number, body: DireccionUpdate): Promise<DireccionRead> => {
    const { data } = await api.patch<DireccionRead>(`/api/v1/direcciones/${id}`, body);
    return data;
  },

  setPrincipal: async (id: number): Promise<DireccionRead> => {
    const { data } = await api.patch<DireccionRead>(
      `/api/v1/direcciones/${id}/principal`,
    );
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/api/v1/direcciones/${id}`);
  },
};
