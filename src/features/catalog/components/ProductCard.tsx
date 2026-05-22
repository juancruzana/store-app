import { useCartStore } from "@/features/cart/store/useCartStore";
import type { Producto } from "../types";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="rounded-lg border p-4 shadow-sm hover:shadow-md transition">
      {producto.imagen_url && (
        <img
          src={producto.imagen_url}
          className="w-full h-40 object-cover rounded"
          alt={producto.nombre}
        />
      )}
      <h3 className="font-semibold mt-2">{producto.nombre}</h3>
      <p className="text-sm text-gray-600">{producto.descripcion}</p>
      <p className="text-lg font-bold mt-2">${parseFloat(producto.precio).toFixed(2)}</p>
      <button
        disabled={!producto.disponible}
        onClick={() =>
          addItem({
            producto_id: producto.id,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio),
            imagen_url: producto.imagen_url,
          })
        }
        className="mt-2 w-full bg-blue-600 text-white rounded py-2 disabled:opacity-50"
      >
        {producto.disponible ? "Agregar al carrito" : "No disponible"}
      </button>
    </div>
  );
}
