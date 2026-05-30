import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import { OrderSummary } from "../components/OrderSummary";
import { OrderForm } from "../components/OrderForm";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [items.length, navigate]);

  if (items.length === 0) return null;

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
