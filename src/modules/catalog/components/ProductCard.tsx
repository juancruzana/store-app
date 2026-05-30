import { Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/modules/cart/stores/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import type { Producto } from "../types";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/productos/${producto.id}`)}
    >
      <div className="h-32 bg-gray-100 overflow-hidden">
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-300">
            <Utensils className="w-12 h-12" />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight">{producto.nombre}</h3>
        <p className="text-base font-bold text-indigo-600 mt-0.5">
          {formatPrice(producto.precio)}
        </p>
        <button
          disabled={!producto.disponible}
          onClick={(e) => {
            e.stopPropagation();
            addItem({
              producto_id: producto.id,
              nombre: producto.nombre,
              precio: parseFloat(producto.precio),
              imagen_url: producto.imagen_url,
            });
          }}
          className="mt-2 w-full bg-indigo-600 text-white text-xs py-1.5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition font-semibold"
        >
          {producto.disponible ? "Agregar" : "No disponible"}
        </button>
      </div>
    </div>
  );
}
