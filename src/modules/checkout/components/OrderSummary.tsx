import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/modules/cart/stores/useCartStore";

const ENVIO = 2.0;

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.total());

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Tu pedido</h3>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.producto_id} className="flex justify-between py-2.5 text-sm">
            <span className="text-gray-700">
              {item.cantidad}× {item.nombre}
            </span>
            <span className="font-medium text-gray-900">
              {formatPrice(item.precio * item.cantidad)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 mt-2 pt-3 space-y-1.5">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Envío</span>
          <span>{formatPrice(ENVIO)}</span>
        </div>
        <div className="flex justify-between font-bold text-base text-indigo-600 pt-1">
          <span>Total</span>
          <span>{formatPrice(subtotal + ENVIO)}</span>
        </div>
      </div>
    </div>
  );
}
