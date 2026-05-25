# Food Store — store-app

Frontend del cliente final para la tienda de food delivery. Permite navegar el catálogo, ver el detalle de productos con ingredientes, gestionar el carrito y confirmar pedidos.

> Sistema compuesto por tres repositorios:
> - **store-app** — este repo, interfaz del cliente
> - **admin-app** — panel de administración
> - **Backend** — API REST

---

## Stack

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19 | Framework principal |
| TypeScript | 6 | Tipado estático |
| Vite | 8 | Bundler y dev server |
| Tailwind CSS | 4 | Estilos utilitarios |
| React Router DOM | 7 | Navegación entre pantallas |
| TanStack Query | 5 | Fetching, caché y sincronización con la API |
| Axios | 1 | Cliente HTTP con `baseURL` desde variable de entorno |
| Zustand | 5 | Estado global del carrito (con `persist`) |
| lucide-react | — | Iconografía |

---

## Cómo levantar el proyecto

**Requisitos:** Node.js ≥ 20 y [pnpm](https://pnpm.io/)

```bash
pnpm install
cp .env.example .env
pnpm dev
```

El servidor corre en `http://localhost:5173`

### Otros scripts

```bash
pnpm build      # Compilar para producción (tsc + vite build)
pnpm preview    # Previsualizar el build de producción
pnpm lint       # Ejecutar ESLint
```

---

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar:

```bash
VITE_API_URL=http://localhost:3000
```

---

## Estructura de carpetas

```
src/
├── components/           # Componentes por dominio
│   ├── cart/             #   CartDrawer, CartItem, CartSummary
│   ├── catalog/          #   ProductCard, ProductGrid, CategoryFilter
│   └── checkout/         #   OrderForm, OrderSummary
├── hooks/                # Hooks reutilizables
│   │                     #   useCategories, useProducts, useCheckout
│   │                     #   useDebounce, useLocalStorage
├── lib/                  # Configuración de librerías externas
│   ├── axios.ts          #   Instancia Axios con baseURL desde .env
│   └── queryClient.ts    #   Configuración de TanStack Query
├── pages/                # Una página por ruta
│   │                     #   HomePage, ProductPage, CartPage
│   │                     #   CheckoutPage, OrdersPage
├── router/               # Definición de rutas (React Router)
│   └── AppRouter.tsx
├── services/             # Llamadas a la API por recurso
│   │                     #   categoryService, productService
│   │                     #   orderService, ingredientService
├── shared/               # Componentes y layouts transversales
│   ├── layout/           #   Navbar, Header, Footer, PageWrapper
│   └── ui/               #   Button, Input, Card, Modal, Badge, Spinner
├── stores/               # Estado global Zustand
│   │                     #   useCartStore (carrito con persist)
│   │                     #   useCartDrawerStore, useOrderStore
├── types/                # Tipos TypeScript compartidos
│   │                     #   catalog.ts, checkout.ts, index.ts
├── utils/                # Funciones puras
│   │                     #   formatDate, formatPrice
└── main.tsx              # Punto de entrada — QueryClientProvider + BrowserRouter
```

---

## Pantallas

| Pantalla | Ruta | Descripción |
|---|---|---|
| Listado de productos | `/` | Catálogo con búsqueda y filtro por categoría |
| Detalle de producto | `/product/:id` | Ingredientes, foto y botón agregar al carrito |
| Carrito | `/cart` | Items, cantidades, total y acceso al checkout |
| Checkout | `/checkout` | Formulario de pedido y confirmación |
| Mis pedidos | `/orders` | Historial de pedidos realizados |

> La app es 100% pública — no requiere autenticación.

---

## Convenciones

- **Componentes:** `PascalCase` → `ProductCard.tsx`
- **Hooks:** prefijo `use` → `useProducts.ts`
- **Services:** sufijo `Service` → `productService.ts`
- **Stores:** `use` + `Store` → `useCartStore.ts`
- **Types:** `PascalCase` → `Product`, `CartItem`

---

## Presentación

Para una explicación completa del proyecto, podés ver el video de presentación en youtube: https://www.youtube.com/watch?v=b4mTVZgxGHw
