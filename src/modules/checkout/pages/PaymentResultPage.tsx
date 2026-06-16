import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { pagoService } from "../services/pagoService";

const RESULT_CONFIG = {
  success: {
    emoji: "✅",
    title: "¡Pago aprobado!",
    message: "Tu pedido está confirmado y pronto empezaremos a prepararlo.",
    color: "text-green-600",
  },
  failure: {
    emoji: "❌",
    title: "Pago rechazado",
    message: "El pago no pudo completarse. Podés intentar nuevamente desde el pedido.",
    color: "text-red-600",
  },
  pending: {
    emoji: "⏳",
    title: "Pago pendiente",
    message: "Tu pago está siendo procesado. Te notificaremos cuando se confirme.",
    color: "text-yellow-600",
  },
};

export default function PaymentResultPage() {
  const { id, status } = useParams<{ id: string; status: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const config =
    RESULT_CONFIG[status as keyof typeof RESULT_CONFIG] ?? RESULT_CONFIG.pending;

  useEffect(() => {
    if (!id) return;
    const pedidoId = Number(id);
    // MP agrega payment_id/collection_id al redirigir
    const pidRaw = searchParams.get("payment_id") || searchParams.get("collection_id");
    const paymentId = pidRaw ? Number(pidRaw) : undefined;

    // El status de la URL es solo la pista de MP, NO la verdad. Confirmamos
    // activamente contra el backend: consulta el estado real a MP y pasa el
    // pedido a CONFIRMADO si el pago fue aprobado (no depende del webhook, que
    // en local sin URL pública no llega).
    const sincronizar =
      status === "success" || status === "pending"
        ? pagoService.confirmPayment(pedidoId, paymentId)
        : Promise.resolve(null);

    sincronizar
      .catch(() => undefined)
      .finally(() => qc.invalidateQueries({ queryKey: ["pedidos"] }));
  }, [id, status, searchParams, qc]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-sm w-full text-center space-y-4">
        <div className="text-5xl">{config.emoji}</div>
        <h1 className={`font-bold text-xl ${config.color}`}>{config.title}</h1>
        <p className="text-sm text-gray-500">{config.message}</p>

        <div className="pt-2 space-y-3">
          {id && (
            <button
              onClick={() => navigate(`/pedidos/${id}`)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Ver mi pedido
            </button>
          )}
          <button
            onClick={() => navigate("/pedidos")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
          >
            Ver todos mis pedidos
          </button>
        </div>
      </div>
    </div>
  );
}
