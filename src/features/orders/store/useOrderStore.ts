import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  producto_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen_url?: string | null;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "pendiente" | "en_camino" | "completado";
}

interface OrderStore {
  orders: Order[];
  addOrder: (items: OrderItem[], total: number) => Order;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (items, total) => {
        const newOrder: Order = {
          id: `#${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString(),
          items,
          total,
          status: "pendiente",
        };
        set((s) => ({ orders: [newOrder, ...s.orders] }));
        return newOrder;
      },
    }),
    { name: "foodstore-orders", version: 1 }
  )
);
