import { useState } from "react";
import type {
  DireccionCreate,
  DireccionRead,
} from "@/modules/checkout/services/direccionService";

interface AddressFormProps {
  initial?: DireccionRead;
  pending?: boolean;
  onSubmit: (body: DireccionCreate) => void;
  onCancel: () => void;
}

const inputClass =
  "mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100";

export function AddressForm({ initial, pending, onSubmit, onCancel }: AddressFormProps) {
  const [alias, setAlias] = useState(initial?.alias ?? "");
  const [calle, setCalle] = useState(initial?.calle ?? "");
  const [numero, setNumero] = useState(initial?.numero ?? "");
  const [ciudad, setCiudad] = useState(initial?.ciudad ?? "");
  const [referencia, setReferencia] = useState(initial?.referencia ?? "");
  const [codigoPostal, setCodigoPostal] = useState(initial?.codigo_postal ?? "");

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    onSubmit({
      alias: alias.trim(),
      calle: calle.trim(),
      numero: numero.trim(),
      ciudad: ciudad.trim(),
      referencia: referencia.trim() || undefined,
      codigo_postal: codigoPostal.trim() || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-medium text-gray-500">Alias</span>
          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Casa, Trabajo..."
            maxLength={80}
            required
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-500">Ciudad</span>
          <input
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            maxLength={120}
            required
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-500">Calle</span>
          <input
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
            maxLength={200}
            required
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-500">Número</span>
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            maxLength={20}
            required
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-500">Código postal</span>
          <input
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
            maxLength={20}
            placeholder="Opcional"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-500">Referencia</span>
          <input
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            maxLength={300}
            placeholder="Opcional"
            className={inputClass}
          />
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {pending ? "Guardando..." : initial ? "Guardar" : "Agregar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl font-medium text-sm text-gray-600 hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
