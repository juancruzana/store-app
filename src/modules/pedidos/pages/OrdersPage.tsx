import { useEffect } from "react";
import { ClipboardList } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { orderService } from "@/modules/checkout/services/orderService";
import { useWSStore } from "@/modules/ws/useWSStore";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import { Spinner } from "@/shared/ui/Spinner";
import type { Pedido } from "@/modules/checkout/types";

const ESTADO_STYLES: Record<string, { label: string; className: string }> = {
  PENDIENTE:  { label: "Pendiente",       className: "bg-yellow-100 text-yellow-700" },
  CONFIRMADO: { label: "Confirmado",      className: "bg-blue-100 text-blue-700" },
  EN_PREP:    { label: "En preparación",  className: "bg-orange-100 text-orange-700" },
  ENTREGADO:  { label: "Entregado",       className: "bg-green-100 text-green-700" },
  CANCELADO:  { label: "Cancelado",       className: "bg-gray-100 text-gray-500" },
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: pedidos, isLoading, error } = useQuery<Pedido[]>({
    queryKey: ["pedidos"],
    queryFn: orderService.listMine,
  });

  const { connect, disconnect } = useWSStore();

  useEffect(() => {
    connect((evento) => {
      if (evento.event === "PEDIDO_ACTUALIZADO") {
        qc.invalidateQueries({ queryKey: ["pedidos"] });
      }
    });
    return () => disconnect();
  }, [connect, disconnect, qc]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-red-500">Error al cargar los pedidos</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Mis pedidos</h1>

      {!pedidos || pedidos.length === 0 ? (
        <div className="py-20 text-center">
          <ClipboardList className="w-14 h-14 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">Todavía no realizaste ningún pedido</p>
        </div>
      ) : (
        pedidos.map((pedido) => {
          const estadoConfig =
            ESTADO_STYLES[pedido.estado.codigo] ?? {
              label: pedido.estado.nombre,
              className: "bg-gray-100 text-gray-600",
            };

          return (
            <div
              key={pedido.id}
              onClick={() => navigate(`/pedidos/${pedido.id}`)}
              className="bg-white rounded-2xl shadow-sm p-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-900">Pedido #{pedido.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(pedido.fecha_creacion)}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoConfig.className}`}
                >
                  {estadoConfig.label}
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {pedido.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 text-sm">
                    <span className="text-gray-700">
                      {item.cantidad}× {item.producto_nombre}
                    </span>
                    <span className="text-gray-500">
                      {formatPrice(parseFloat(item.subtotal))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {pedido.forma_pago.nombre} ·{" "}
                  {pedido.direccion_entrega.alias}
                </span>
                <span className="font-bold text-indigo-600">
                  {formatPrice(parseFloat(pedido.total))}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
