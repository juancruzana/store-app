import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useCartDrawerStore } from "../stores/useCartDrawerStore";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const { isOpen, close } = useCartDrawerStore();
  const { items } = useCartStore();
  const cartTotal = useCartStore((s) => s.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0));
  const navigate = useNavigate();

  const handleCheckout = () => {
    close();
    navigate("/checkout");
  };

  return (
    <div className="hidden md:block">
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={close} />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900">Tu carrito</h2>
            <p className="text-xs text-gray-400">
              {items.length} producto{items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button onClick={close} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 divide-y divide-gray-100">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-400">Tu carrito está vacío</p>
          ) : (
            items.map((item) => <CartItem key={item.producto_id} {...item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100">
            <CartSummary
              total={cartTotal}
              onCheckout={handleCheckout}
              onContinue={close}
            />
          </div>
        )}
      </div>
    </div>
  );
}
