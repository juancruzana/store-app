import { useState } from "react";
import { useFormasPago } from "../hooks/useFormasPago";
import { useDirecciones } from "../hooks/useDirecciones";
import { useCreateOrder } from "../hooks/useCheckout";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import { Spinner } from "@/shared/ui/Spinner";

export function OrderForm() {
  const { data: formasPago, isLoading: loadingPago } = useFormasPago();
  const { list: { data: direcciones, isLoading: loadingDir, error: errorDir } } = useDirecciones();
  const createOrder = useCreateOrder();
  const items = useCartStore((s) => s.items);

  const [formaPagoId, setFormaPagoId] = useState<number | null>(null);
  const [observaciones, setObservaciones] = useState("");

  const direccion = direcciones?.[0];

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!formaPagoId || !direccion) return;

    createOrder.mutate({
      direccion_entrega_id: direccion.id,
      forma_pago_id: formaPagoId,
      observaciones: observaciones.trim() || undefined,
      items: items.map((i) => ({ producto_id: i.producto_id, cantidad: i.cantidad })),
    });
  };

  if (loadingDir || loadingPago) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dirección de entrega */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-1">Dirección de entrega</h3>
        {errorDir ? (
          <p className="text-sm text-red-500">
            Error: {errorDir instanceof Error ? errorDir.message : "Error desconocido"}
          </p>
        ) : direccion ? (
          <>
            <p className="text-sm text-gray-700">{direccion.alias}</p>
            <p className="text-xs text-gray-500">
              {direccion.calle} {direccion.numero}, {direccion.ciudad}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-400">Sin dirección guardada</p>
        )}
      </div>

      {/* Forma de pago */}
      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 mb-1">Forma de pago</h3>
        {formasPago?.map((fp) => (
          <label
            key={fp.id}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
              formaPagoId === fp.id
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="formaPago"
              value={fp.id}
              checked={formaPagoId === fp.id}
              onChange={() => setFormaPagoId(fp.id)}
              className="accent-indigo-600"
            />
            <span className="text-sm font-medium text-gray-900">{fp.nombre}</span>
          </label>
        ))}
      </div>

      {/* Observaciones */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-2">
          Observaciones{" "}
          <span className="font-normal text-gray-400">(opcional)</span>
        </h3>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Sin cebolla, alergia a..."
          rows={2}
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {createOrder.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {createOrder.error instanceof Error
            ? createOrder.error.message
            : "Error al crear el pedido"}
        </div>
      )}

      <button
        type="submit"
        disabled={!formaPagoId || !direccion || createOrder.isPending}
        className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        {createOrder.isPending ? "Procesando..." : "Confirmar pedido"}
      </button>
    </form>
  );
}
