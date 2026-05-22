import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/categoryService";

export const useCategories = () =>
  useQuery({
    queryKey: ["categorias"],
    queryFn: () => categoryService.list(),
  });
