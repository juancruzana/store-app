import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
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

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pedidoId = Number(id);

  const { data: pedido, isLoading, error } = useQuery<Pedido>({
    queryKey: ["pedidos", pedidoId],
    queryFn: () => orderService.getById(pedidoId),
    enabled: !isNaN(pedidoId),
  });

  // Escuchar eventos WS para este pedido específico
  const { connect, disconnect, subscribeOrder } = useWSStore();

  useEffect(() => {
    connect((evento) => {
      if (evento.event === "PEDIDO_ACTUALIZADO" && evento.data?.pedido_id === pedidoId) {
        qc.invalidateQueries({ queryKey: ["pedidos", pedidoId] });
      }
    });
    return () => disconnect();
  }, [connect, disconnect, pedidoId, qc]);

  useEffect(() => {
    if (!isNaN(pedidoId)) {
      subscribeOrder(pedidoId);
    }
  }, [subscribeOrder, pedidoId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (error || !pedido) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-red-500">Error al cargar el pedido</p>
      </div>
    );
  }

  const estadoConfig =
    ESTADO_STYLES[pedido.estado.codigo] ?? {
      label: pedido.estado.nombre,
      className: "bg-gray-100 text-gray-600",
    };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/pedidos")}
          className="text-gray-500 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-bold text-gray-900 text-lg">Pedido #{pedido.id}</h1>
          <p className="text-xs text-gray-400">{formatDate(pedido.fecha_creacion)}</p>
        </div>
        <span
          className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${estadoConfig.className}`}
        >
          {estadoConfig.label}
        </span>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="font-semibold text-gray-900 mb-3">Productos</h2>
        <div className="divide-y divide-gray-100">
          {pedido.items.map((item, i) => (
            <div key={i} className="flex justify-between py-2.5 text-sm">
              <span className="text-gray-700">
                {item.cantidad}× {item.producto_nombre}
              </span>
              <div className="text-right">
                <span className="text-gray-500">{formatPrice(parseFloat(item.subtotal))}</span>
                <p className="text-xs text-gray-400">
                  {formatPrice(parseFloat(item.precio_unitario))} c/u
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-2">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-indigo-600 text-lg">
            {formatPrice(parseFloat(pedido.total))}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
        <h2 className="font-semibold text-gray-900 mb-2">Detalle</h2>
        <div className="text-sm space-y-1.5">
          <div className="flex justify-between">
            <span className="text-gray-500">Forma de pago</span>
            <span className="text-gray-900">{pedido.forma_pago.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Dirección</span>
            <span className="text-gray-900 text-right">
              {pedido.direccion_entrega.alias}
              {pedido.direccion_entrega.calle && ` · ${pedido.direccion_entrega.calle}`}
            </span>
          </div>
          {pedido.observaciones && (
            <div className="flex justify-between">
              <span className="text-gray-500">Observaciones</span>
              <span className="text-gray-900 text-right max-w-[60%]">{pedido.observaciones}</span>
            </div>
          )}
        </div>
      </div>

      {/* Historial */}
      {pedido.historial && pedido.historial.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Historial de estados</h2>
          <ol className="relative border-l border-gray-200 ml-3 space-y-4">
            {pedido.historial.map((h, i) => {
              const cfg =
                ESTADO_STYLES[h.estado_nuevo.codigo] ?? {
                  label: h.estado_nuevo.nombre,
                  className: "bg-gray-100 text-gray-600",
                };
              return (
                <li key={i} className="ml-4">
                  <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-indigo-400 border-2 border-white" />
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.className}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(h.fecha)}</span>
                  </div>
                  {h.observacion && (
                    <p className="text-xs text-gray-500 mt-0.5 italic">"{h.observacion}"</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
