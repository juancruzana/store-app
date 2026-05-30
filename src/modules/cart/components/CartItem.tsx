import { Utensils, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { formatPrice } from "@/utils/formatPrice";

interface CartItemProps {
  producto_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen_url?: string | null;
}

export function CartItem({ producto_id, nombre, precio, cantidad, imagen_url }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-gray-100">
        {imagen_url ? (
          <img src={imagen_url} alt={nombre} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-300">
            <Utensils className="w-6 h-6" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{nombre}</p>
        <p className="text-xs text-gray-400">{formatPrice(precio)} c/u</p>
        <p className="text-sm font-bold text-indigo-600">{formatPrice(precio * cantidad)}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => updateQuantity(producto_id, cantidad - 1)}
          className="h-6 w-6 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center text-sm font-bold transition"
        >
          −
        </button>
        <span className="w-5 text-center text-sm font-semibold">{cantidad}</span>
        <button
          onClick={() => updateQuantity(producto_id, cantidad + 1)}
          className="h-6 w-6 rounded-full border border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center text-sm font-bold transition"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeItem(producto_id)}
        className="text-gray-300 hover:text-red-500 transition ml-1"
        aria-label="Eliminar"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
