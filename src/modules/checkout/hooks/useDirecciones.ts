import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  direccionService,
  type DireccionCreate,
  type DireccionUpdate,
} from "../services/direccionService";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";

export function useDirecciones() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const list = useQuery({
    queryKey: ["direcciones"],
    queryFn: direccionService.list,
    enabled: isAuthenticated,
  });

  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["direcciones"] });

  const create = useMutation({
    mutationFn: (body: DireccionCreate) => direccionService.create(body),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, body }: { id: number; body: DireccionUpdate }) =>
      direccionService.update(id, body),
    onSuccess: invalidate,
  });

  const setPrincipal = useMutation({
    mutationFn: (id: number) => direccionService.setPrincipal(id),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: number) => direccionService.remove(id),
    onSuccess: invalidate,
  });

  return { list, create, update, setPrincipal, remove };
}
