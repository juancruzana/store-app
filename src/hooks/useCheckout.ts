import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { orderService } from "@/services/orderService";
import { useCartStore } from "@/stores/useCartStore";

export const useCreateOrder = () => {
  const navigate = useNavigate();
  const clearCart = useCartStore((s) => s.clear);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: orderService.create,
    onSuccess: (pedido) => {
      clearCart();
      qc.invalidateQueries({ queryKey: ["pedidos"] });
      navigate(`/pedidos/${pedido.id}`);
    },
  });
};
