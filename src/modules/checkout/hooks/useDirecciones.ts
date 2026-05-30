import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { direccionService, type DireccionCreate } from "../services/direccionService";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";

export function useDirecciones() {
  const isReady = useAuthStore((s) => s.isReady);

  const list = useQuery({
    queryKey: ["direcciones"],
    queryFn: direccionService.list,
    enabled: isReady,
  });

  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (body: DireccionCreate) => direccionService.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["direcciones"] });
    },
  });

  return { list, create };
}
