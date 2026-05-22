import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService";
import { useCartStore } from "@/features/cart/store/useCartStore";

export const useCreateOrder = () => {
  const navigate = useNavigate();
  const clearCart = useCartStore((s) => s.clear);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: orderService.create,
    onSuccess: (pedido) => {
      clearCart();
      qc.invalidateQueries({ queryKey: ["pedidos"] }); // ⭐ invalidación de cache
      navigate(`/pedidos/${pedido.id}`);
    },
  });
};

import { useForm } from "@tanstack/react-form";

const form = useForm({
  defaultValues: {
    direccion_entrega_id: 0,
    forma_pago_id: 0,
    observaciones: "",
  },
  onSubmit: async ({ value }) => {
    await createOrder.mutateAsync({
      ...value,
      items: cartItems.map((i) => ({
        producto_id: i.producto_id,
        cantidad: i.cantidad,
      })),
    });
  },
});