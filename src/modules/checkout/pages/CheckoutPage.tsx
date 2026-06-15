import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import { OrderSummary } from "../components/OrderSummary";
import { OrderForm } from "../components/OrderForm";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);

  // Solo rebotamos a /cart si se entró al checkout con el carrito ya vacío.
  // No cuando el carrito se vacía por un pedido exitoso (ahí navegamos a /pago o /pedidos).
  const estabaVacioAlEntrar = useRef(items.length === 0);

  useEffect(() => {
    if (estabaVacioAlEntrar.current) {
      navigate("/cart", { replace: true });
    }
  }, [navigate]);

  if (estabaVacioAlEntrar.current) return null;

  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => navigate("/cart")}
          className="text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-gray-900 text-lg">Confirmar pedido</h1>
      </div>

      <OrderSummary />
      <OrderForm />
    </div>
  );
}
