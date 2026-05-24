import { ClipboardList } from "lucide-react";
import { useOrderStore } from "@/stores/useOrderStore";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";

const STATUS_CONFIG = {
  pendiente: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
  en_camino: { label: "En camino", className: "bg-blue-100 text-blue-700" },
  completado: { label: "Completado", className: "bg-green-100 text-green-700" },
};

const ENVIO = 2.0;

export default function OrdersPage() {
  const orders = useOrderStore((s) => s.orders);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Mis pedidos</h1>

      {orders.length === 0 ? (
        <div className="py-20 text-center">
          <ClipboardList className="w-14 h-14 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">Todavía no realizaste ningún pedido</p>
        </div>
      ) : (
        orders.map((order) => {
          const status = STATUS_CONFIG[order.status];
          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-900">Pedido {order.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.date)}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
                  {status.label}
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.producto_id} className="flex justify-between py-2 text-sm">
                    <span className="text-gray-700">
                      {item.cantidad}× {item.nombre}
                    </span>
                    <span className="text-gray-500">
                      {formatPrice(item.precio * item.cantidad)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500">Envío</span>
                <span className="text-sm text-gray-500">{formatPrice(ENVIO)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-indigo-600">
                  {formatPrice(order.total + ENVIO)}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
