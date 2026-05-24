export interface CategoriaSimple {
  id: number;
  nombre: string;
  descripcion: string | null;
  parent_id: number | null;
  activa: boolean;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
  parent_id: number | null;
  activa: boolean;
  created_at: string;
  subcategorias: CategoriaSimple[];
}

export interface ProductoIngrediente {
  ingrediente_id: number;
  nombre: string;
  cantidad: number;
  unidad_medida: string;
  es_alergeno: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: string;
  disponible: boolean;
  stock_cantidad: number;
  imagen_url: string | null;
  created_at: string;
  categoria: Categoria | null;
  ingredientes: ProductoIngrediente[];
}

export interface ProductoFilters {
  categoria_id?: number;
  disponible?: boolean;
  q?: string;
  page?: number;
  size?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
