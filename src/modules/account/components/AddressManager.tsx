import { useState } from "react";
import { MapPin, Plus, Star, Pencil, Trash2 } from "lucide-react";
import { useDirecciones } from "@/modules/checkout/hooks/useDirecciones";
import { Spinner } from "@/shared/ui/Spinner";
import type { DireccionRead } from "@/modules/checkout/services/direccionService";
import { AddressForm } from "./AddressForm";

export function AddressManager() {
  const { list, create, update, setPrincipal, remove } = useDirecciones();
  const [mode, setMode] = useState<"none" | "new" | { editId: number }>("none");

  const cerrar = () => setMode("none");

  const editando =
    typeof mode === "object" ? list.data?.find((d) => d.id === mode.editId) : undefined;

  return (
    <section className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <h2 className="font-semibold text-gray-900">Mis direcciones</h2>
        </div>
        {mode === "none" && (
          <button
            onClick={() => setMode("new")}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        )}
      </div>

      {(create.error || update.error || remove.error || setPrincipal.error) && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-xl">
          {(create.error || update.error || remove.error || setPrincipal.error)?.message}
        </div>
      )}

      {mode === "new" && (
        <AddressForm
          pending={create.isPending}
          onCancel={cerrar}
          onSubmit={(body) => create.mutate(body, { onSuccess: cerrar })}
        />
      )}

      {list.isLoading ? (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      ) : list.error ? (
        <p className="text-sm text-red-500">No se pudieron cargar las direcciones</p>
      ) : !list.data || list.data.length === 0 ? (
        mode !== "new" && (
          <p className="text-sm text-gray-400 py-2">Todavía no guardaste ninguna dirección</p>
        )
      ) : (
        <ul className="space-y-3">
          {list.data.map((d: DireccionRead) =>
            typeof mode === "object" && mode.editId === d.id ? (
              <li key={d.id}>
                <AddressForm
                  initial={editando}
                  pending={update.isPending}
                  onCancel={cerrar}
                  onSubmit={(body) =>
                    update.mutate({ id: d.id, body }, { onSuccess: cerrar })
                  }
                />
              </li>
            ) : (
              <li
                key={d.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 truncate">{d.alias}</p>
                    {d.es_principal && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-indigo-600" />
                        Principal
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {d.calle} {d.numero}, {d.ciudad}
                    {d.referencia ? ` · ${d.referencia}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!d.es_principal && (
                    <button
                      title="Marcar como principal"
                      onClick={() => setPrincipal.mutate(d.id)}
                      className="p-2 rounded-lg text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    title="Editar"
                    onClick={() => setMode({ editId: d.id })}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    title="Eliminar"
                    onClick={() => {
                      if (confirm(`¿Eliminar la dirección "${d.alias}"?`)) {
                        remove.mutate(d.id);
                      }
                    }}
                    className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  );
}
