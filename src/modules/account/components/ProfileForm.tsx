import { useState } from "react";
import { User } from "lucide-react";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";

export function ProfileForm() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [nombre, setNombre] = useState(user?.nombre ?? "");
  const [apellido, setApellido] = useState(user?.apellido ?? "");
  const [telefono, setTelefono] = useState(user?.telefono ?? "");
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty =
    nombre.trim() !== (user?.nombre ?? "") ||
    apellido.trim() !== (user?.apellido ?? "") ||
    (telefono.trim() || "") !== (user?.telefono ?? "");

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!dirty) return;
    setSaving(true);
    setOk(false);
    setError(null);
    try {
      await updateProfile({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim() || null,
      });
      setOk(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-indigo-600" />
        <h2 className="font-semibold text-gray-900">Datos personales</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-medium text-gray-500">Nombre</span>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              minLength={2}
              maxLength={120}
              required
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-gray-500">Apellido</span>
            <input
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              minLength={2}
              maxLength={120}
              required
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-medium text-gray-500">Teléfono</span>
          <input
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            maxLength={30}
            placeholder="Opcional"
            className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <div className="block">
          <span className="text-xs font-medium text-gray-400">Email</span>
          <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-xl">
            {error}
          </div>
        )}
        {ok && !dirty && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-xl">
            Datos actualizados
          </div>
        )}

        <button
          type="submit"
          disabled={!dirty || saving}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </section>
  );
}
