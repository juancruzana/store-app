export interface PedidoItemInput {
  producto_id: number;
  cantidad: number;
}

export interface PedidoCreateRequest {
  direccion_entrega_id: number;
  forma_pago_id: number;
  observaciones?: string;
  items: PedidoItemInput[];
}

export interface DetallePedido {
  id: number;
  producto_id: number;
  producto_nombre: string;
  precio_unitario: string;
  cantidad: number;
  subtotal: string;
}

export interface Pedido {
  id: number;
  usuario_id: number;
  estado: { codigo: string; nombre: string };
  total: string;
  observaciones: string | null;
  fecha_creacion: string;
  items: DetallePedido[];
  direccion_entrega: { id: number; alias: string; calle: string };
  forma_pago: { codigo: string; nombre: string };
}
