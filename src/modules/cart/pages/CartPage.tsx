import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { CartItem } from "../components/CartItem";
import { CartSummary } from "../components/CartSummary";

export default function CartPage() {
  const { items } = useCartStore();
  const cartTotal = useCartStore((s) => s.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0));
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3.5 flex items-center gap-3 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-gray-900">Tu carrito</h1>
      </div>

      <div className="bg-white divide-y divide-gray-100 px-4">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Tu carrito está vacío</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-sm text-indigo-600 font-semibold hover:underline"
            >
              Ver productos
            </button>
          </div>
        ) : (
          items.map((item) => <CartItem key={item.producto_id} {...item} />)
        )}
      </div>

      {items.length > 0 && (
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
          <CartSummary
            total={cartTotal}
            onCheckout={handleCheckout}
            onContinue={() => navigate("/")}
          />
        </div>
      )}
    </div>
  );
}
