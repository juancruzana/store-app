import { useQuery } from "@tanstack/react-query";
import { catalogService } from "../services/catalogService";

export function useFormasPago() {
  return useQuery({
    queryKey: ["formas-pago"],
    queryFn: catalogService.formasPago,
    staleTime: 1000 * 60 * 10,
  });
}
