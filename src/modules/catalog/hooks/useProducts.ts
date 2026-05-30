import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import type { ProductoFilters } from "../types";

export const useProducts = (filters: ProductoFilters = {}) =>
  useQuery({
    queryKey: ["productos", filters],
    queryFn: () => productService.list(filters),
  });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: ["productos", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
