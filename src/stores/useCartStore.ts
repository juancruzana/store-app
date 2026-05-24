import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  producto_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen_url?: string | null;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cantidad">, cantidad?: number) => void;
  removeItem: (producto_id: number) => void;
  updateQuantity: (producto_id: number, cantidad: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, cantidad = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.producto_id === item.producto_id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.producto_id === item.producto_id
                  ? { ...i, cantidad: i.cantidad + cantidad }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, cantidad }] };
        });
      },

      removeItem: (producto_id) =>
        set((state) => ({
          items: state.items.filter((i) => i.producto_id !== producto_id),
        })),

      updateQuantity: (producto_id, cantidad) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.producto_id === producto_id ? { ...i, cantidad } : i))
            .filter((i) => i.cantidad > 0),
        })),

      clear: () => set({ items: [] }),

      total: () => get().items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
      count: () => get().items.reduce((acc, i) => acc + i.cantidad, 0),
    }),
    {
      name: "foodstore-cart",
      version: 1,
    }
  )
);
